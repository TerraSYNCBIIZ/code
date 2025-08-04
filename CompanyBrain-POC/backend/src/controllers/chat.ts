import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { mcpService } from '../server.js';

const router = Router();

// Initialize AI services
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

router.post('/message', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Process message with Claude
    const claudeResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are CompanyBrain, a helpful AI assistant for business employees. 
        The user said: "${message}"
        
        Respond helpfully and offer to take actions like:
        - Scheduling meetings
        - Finding documents  
        - Checking calendar
        - Managing emails
        - Recording meetings
        
        Be conversational and helpful.`
      }]
    });

    const aiResponse = claudeResponse.content[0].type === 'text' 
      ? claudeResponse.content[0].text 
      : 'I can help you with various tasks!';

    // Store conversation in Context7 (via MCP)
    await mcpService.executeCommand({
      method: 'context7.store',
      params: {
        userId,
        context: `User: ${message}\nAI: ${aiResponse}`,
        timestamp: new Date().toISOString()
      }
    });

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      fallback: 'I apologize, but I encountered an error. Please try again.'
    });
  }
});

router.post('/voice', async (req, res) => {
  try {
    const { audioData, userId } = req.body;

    // Use Gemini for voice transcription (mock for now)
    const transcription = "This is a mock transcription. In real implementation, process audioData with Gemini.";

    // Process the transcribed text as a regular message
    const claudeResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Voice message transcription: "${transcription}". Respond as CompanyBrain AI assistant.`
      }]
    });

    const aiResponse = claudeResponse.content[0].type === 'text' 
      ? claudeResponse.content[0].text 
      : 'I heard your voice message!';

    res.json({
      success: true,
      transcription,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Voice processing error:', error);
    res.status(500).json({ error: 'Failed to process voice message' });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve conversation history from Context7
    const historyResponse = await mcpService.executeCommand({
      method: 'context7.retrieve',
      params: { userId }
    });

    res.json({
      success: true,
      history: historyResponse.data?.history || []
    });

  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
});

export { router as chatRouter };