import { Router } from 'express';
import { mcpService } from '../server.js';

const router = Router();

router.post('/execute', async (req, res) => {
  try {
    const { method, params, server } = req.body;

    const result = await mcpService.executeCommand({
      method,
      params,
      server
    });

    res.json(result);
  } catch (error) {
    console.error('MCP execution error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to execute MCP command'
    });
  }
});

router.get('/status', (req, res) => {
  const status = mcpService.getServerStatus();
  res.json({
    connected: mcpService.isConnected(),
    servers: status
  });
});

router.get('/servers', (req, res) => {
  const servers = [
    {
      name: 'context7',
      description: 'Personal memory and context storage',
      status: 'connected'
    },
    {
      name: 'browser-use',
      description: 'Browser automation and recording',
      status: 'connected'
    },
    {
      name: 'google-workspace',
      description: 'Google Docs, Calendar, Gmail integration',
      status: 'connected'
    },
    {
      name: 'odoo',
      description: 'ERP system integration',
      status: 'connected'
    }
  ];

  res.json({ servers });
});

export { router as mcpRouter };