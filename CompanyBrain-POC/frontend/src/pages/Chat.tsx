import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, List, Avatar, Typography, Space, Tag, Spin } from 'antd';
import { SendOutlined, AudioOutlined, PaperClipOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useCustom, useGetIdentity } from '@refinedev/core';

const { Text } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'action' | 'voice';
  metadata?: {
    action?: string;
    status?: 'success' | 'pending' | 'error';
    results?: any;
  };
}

interface QuickAction {
  label: string;
  command: string;
  icon: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { label: 'Schedule Meeting', command: 'Schedule a meeting with the team for next week', icon: '📅' },
    { label: 'Find Documents', command: 'Find documents related to Q4 budget', icon: '📄' },
    { label: 'Check Calendar', command: 'What meetings do I have today?', icon: '🗓️' },
    { label: 'Email Summary', command: 'Summarize my unread emails', icon: '📧' },
    { label: 'Create Task', command: 'Create a task to review the client proposal', icon: '✅' },
    { label: 'Record Meeting', command: 'Start recording this meeting and take notes', icon: '🎙️' },
  ];

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m your CompanyBrain AI assistant. I can help you with scheduling, finding documents, managing tasks, recording meetings, and accessing your business systems. How can I assist you today?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || currentMessage.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI processing with realistic responses
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
      return {
        id: Date.now().toString(),
        content: 'I\'ll help you schedule a meeting. Let me check everyone\'s availability...\n\n✅ Found available slot: Tomorrow at 2:00 PM\n📧 Sending calendar invites to participants\n📅 Meeting created: "Team Discussion"\n\nWould you like me to add an agenda or make any changes?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        metadata: {
          action: 'schedule_meeting',
          status: 'success'
        }
      };
    } else if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s your email summary:\n\n📧 **5 unread emails**\n• Contract Review (High Priority) - Legal Team\n• Q4 Marketing Strategy - Sarah Wilson\n• Weekly Report - John Smith\n• Client Feedback - TechCorp\n• Team Meeting Notes - Project Alpha\n\nThe contract review needs immediate attention. Would you like me to open it or draft a response?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        metadata: {
          action: 'email_summary',
          status: 'success'
        }
      };
    } else if (lowerMessage.includes('calendar') || lowerMessage.includes('today')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s your schedule for today:\n\n🕘 **9:00 AM** - Q4 Budget Review (1h)\n   📍 Conference Room A\n   👥 John Smith, Sarah Wilson\n\n🕑 **2:00 PM** - Client Call - TechCorp (30m)\n   📞 Zoom Meeting\n   👤 Mike Johnson\n\n🕕 **4:30 PM** - Project Status Update (45m)\n   📍 Team Alpha Space\n   👥 Development Team\n\nYou have 30 minutes free before your next meeting. Need me to prepare anything?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        metadata: {
          action: 'calendar_check',
          status: 'success'
        }
      };
    } else if (lowerMessage.includes('record') || lowerMessage.includes('meeting notes')) {
      return {
        id: Date.now().toString(),
        content: '🎙️ **Recording started**\n\nI\'m now recording this session and will:\n• Transcribe all speech in real-time\n• Identify key decisions and action items\n• Store the transcript in your personal memory\n• Generate a summary when the meeting ends\n\nClick the red button in the top right to stop recording. Everything will be automatically saved to your Context7 storage.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        metadata: {
          action: 'start_recording',
          status: 'success'
        }
      };
    } else if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('document')) {
      return {
        id: Date.now().toString(),
        content: '🔍 **Search Results:**\n\n📄 **Q4-Budget-Draft-v3.pdf**\n   📅 Modified: 2 days ago\n   👤 Sarah Wilson\n   📂 Finance/Q4-Planning\n\n📄 **Budget-Review-Notes.docx**\n   📅 Modified: 1 day ago\n   👤 John Smith\n   📂 Meetings/Q4-Budget\n\n📊 **Financial-Projections.xlsx**\n   📅 Modified: 3 hours ago\n   👤 You\n   📂 Finance/Projections\n\nWould you like me to open any of these documents or search for something more specific?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        metadata: {
          action: 'document_search',
          status: 'success'
        }
      };
    } else {
      return {
        id: Date.now().toString(),
        content: 'I understand you\'d like help with that. I can assist you with:\n\n• 📅 Scheduling meetings and managing your calendar\n• 📧 Reading and managing emails\n• 📄 Finding and organizing documents\n• ✅ Creating and tracking tasks\n• 🎙️ Recording meetings with transcription\n• 💼 Accessing your Odoo ERP system\n• 🔍 Searching across all your business systems\n\nWhat would you like to do first?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // In real app, integrate with voice recording API
    if (!isRecording) {
      // Start recording
      console.log('Starting voice recording...');
    } else {
      // Stop recording and process
      console.log('Stopping voice recording...');
      // Simulate voice message
      setTimeout(() => {
        const voiceMessage: Message = {
          id: Date.now().toString(),
          content: 'Schedule a meeting with Sarah about the marketing campaign',
          sender: 'user',
          timestamp: new Date(),
          type: 'voice'
        };
        setMessages(prev => [...prev, voiceMessage]);
        handleSendMessage(voiceMessage.content);
      }, 1000);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <Card
        title="AI Assistant Chat"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}
      >
        {/* Quick Actions */}
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>Quick Actions:</Text>
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quickActions.map((action, index) => (
              <Button
                key={index}
                size="small"
                onClick={() => handleSendMessage(action.command)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item style={{ border: 'none', padding: '8px 0' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '70%' }}>
                    {message.sender === 'ai' && (
                      <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: '#1677ff' }} />
                    )}
                    <div>
                      <div
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          backgroundColor: message.sender === 'user' ? '#1677ff' : '#f5f5f5',
                          color: message.sender === 'user' ? 'white' : 'black',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {message.content}
                        {message.type === 'voice' && (
                          <Tag color="blue" style={{ marginLeft: '8px' }}>
                            🎤 Voice
                          </Tag>
                        )}
                        {message.metadata?.action && (
                          <Tag 
                            color={message.metadata.status === 'success' ? 'green' : message.metadata.status === 'error' ? 'red' : 'orange'}
                            style={{ marginTop: '8px', display: 'block', width: 'fit-content' }}
                          >
                            {message.metadata.action.replace('_', ' ').toUpperCase()}
                          </Tag>
                        )}
                      </div>
                      <Text type="secondary" style={{ fontSize: '11px', marginTop: '4px', display: 'block' }}>
                        {formatTimestamp(message.timestamp)}
                      </Text>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px' }}>
              <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: '#1677ff' }} />
              <Spin size="small" />
              <Text type="secondary">AI is thinking...</Text>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
          <Space.Compact style={{ width: '100%' }}>
            <TextArea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Schedule a meeting with John', 'What emails do I have?')"
              autoSize={{ minRows: 1, maxRows: 4 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              icon={<PaperClipOutlined />} 
              disabled
              title="File attachment (coming soon)"
            />
            <Button
              type={isRecording ? 'primary' : 'default'}
              icon={<AudioOutlined />}
              onClick={handleVoiceToggle}
              style={{ backgroundColor: isRecording ? '#f50' : undefined }}
              title={isRecording ? 'Stop recording' : 'Start voice input'}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => handleSendMessage()}
              disabled={!currentMessage.trim() || isLoading}
            />
          </Space.Compact>
        </div>
      </Card>
    </div>
  );
};