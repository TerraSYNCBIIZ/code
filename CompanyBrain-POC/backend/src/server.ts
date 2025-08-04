import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import { authRouter } from './controllers/auth.js';
import { chatRouter } from './controllers/chat.js';
import { mcpRouter } from './controllers/mcp.js';
import { errorHandler } from './middleware/errorHandler.js';
import { MCPService } from './services/MCPService.js';
import { SocketService } from './services/SocketService.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

// Initialize services
const mcpService = new MCPService();
const socketService = new SocketService(io);

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      mcp: mcpService.isConnected(),
      socket: socketService.isConnected()
    }
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/mcp', mcpRouter);

// Error handling
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-user', (userId: string) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Initialize MCP connections
async function initializeServices() {
  try {
    await mcpService.initialize();
    console.log('✅ MCP Service initialized');
  } catch (error) {
    console.error('❌ Failed to initialize MCP Service:', error);
  }
}

// Start server
server.listen(PORT, async () => {
  console.log(`🚀 CompanyBrain Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
  
  await initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, io, mcpService };