# CompanyBrain Setup Guide

## Prerequisites

Before setting up CompanyBrain, ensure you have:

- **Node.js 18+** installed
- **PostgreSQL** database (for user data)
- **Anthropic API Key** (for Claude integration)
- **OpenAI API Key** (for voice transcription)
- **Google Workspace** credentials
- **Odoo** instance access
- **Pipedream** account for MCP integrations

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd CompanyBrain-POC

# Install all dependencies
npm run setup
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb companybrain

# Run migrations (when implemented)
npm run migrate
```

### 3. Environment Configuration

```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys and credentials

# Frontend environment (if needed)
cp frontend/.env.example frontend/.env
```

### 4. MCP Configuration

```bash
# Copy MCP config to your Claude Desktop config
# Windows:
copy config\.mcp.json %APPDATA%\Claude\claude_desktop_config.json

# macOS:
cp config/.mcp.json ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Linux:
cp config/.mcp.json ~/.config/claude/claude_desktop_config.json
```

### 5. Pipedream MCP Setup

1. Go to [Pipedream](https://pipedream.com)
2. Create a new project
3. Set up MCP servers for:
   - Google Docs
   - Google Calendar
   - Gmail
   - Odoo
4. Update your `.env` file with the Pipedream MCP URLs

### 6. Start Development

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:8000
```

## Configuration Details

### Environment Variables

**Required API Keys:**
```env
ANTHROPIC_API_KEY=sk-ant-...           # Claude AI integration
OPENAI_API_KEY=sk-...                  # Voice transcription
```

**Database:**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/companybrain
```

**MCP URLs (from Pipedream):**
```env
GOOGLE_MCP_URL=https://mcp.pipedream.net/YOUR_PROJECT_ID/google_docs
ODOO_MCP_URL=https://mcp.pipedream.net/YOUR_PROJECT_ID/odoo
```

### MCP Server Configuration

The system uses these MCP servers:

1. **Context7** - Personal memory storage
   - Automatic user context retention
   - Conversation history
   - Document associations

2. **Browser-use** - Web automation
   - Meeting recording
   - Form automation
   - Screen capture

3. **Google Workspace** (via Pipedream)
   - Google Docs access
   - Calendar management
   - Gmail integration

4. **Odoo** (via Pipedream)
   - CRM data access
   - Task management
   - Business process automation

## User Authentication

### Demo Login
- **Email:** demo@companybrain.com
- **Password:** demo

### Production Setup
1. Configure your authentication provider (Auth0, Firebase, etc.)
2. Update `authProvider` in `frontend/src/App.tsx`
3. Implement proper user management in backend

## Features Available

### ✅ Current Features
- Dashboard with calendar, email, and task views
- AI chat interface with natural language commands
- Voice input capabilities (UI ready)
- Personal memory system (backend integration)
- MCP server orchestration

### 🚧 In Development
- Real voice recording and transcription
- Live MCP integrations
- User authentication system
- File upload and document management

### 📋 Planned Features
- Mobile app support
- Advanced analytics
- Multi-team support
- Custom workflow builder

## API Endpoints

### Authentication
```
POST /api/auth/login     # User login
POST /api/auth/logout    # User logout
GET  /api/auth/me        # Get current user
```

### Chat & AI
```
POST /api/chat/message   # Send message to AI
GET  /api/chat/history   # Get conversation history
POST /api/chat/voice     # Voice message processing
```

### MCP Integration
```
POST /api/mcp/execute    # Execute MCP command
GET  /api/mcp/status     # Get MCP server status
GET  /api/mcp/servers    # List available servers
```

## Development Commands

```bash
# Frontend (Vite + React)
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build

# Backend (Express + TypeScript)
cd backend
npm run dev          # Development with hot reload
npm run build        # TypeScript compilation
npm run start        # Production server

# Full stack
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run test         # Run all tests
```

## Deployment

### Development Deployment

1. **Frontend** - Deploy to Vercel/Netlify
2. **Backend** - Deploy to DigitalOcean App Platform
3. **Database** - Use managed PostgreSQL
4. **MCPs** - Configure production MCP URLs

### Production Checklist

- [ ] Set up proper authentication
- [ ] Configure production database
- [ ] Set up monitoring and logging
- [ ] Configure SSL certificates
- [ ] Set up backup systems
- [ ] Configure rate limiting
- [ ] Set up error tracking

## Troubleshooting

### Common Issues

**MCP Servers Not Starting:**
- Check if Node.js packages are installed
- Verify MCP URLs are correct
- Check network connectivity

**Database Connection Issues:**
- Verify PostgreSQL is running
- Check database credentials
- Ensure database exists

**Authentication Problems:**
- Check JWT secret is set
- Verify API keys are correct
- Clear browser localStorage

### Logs

```bash
# Backend logs
tail -f backend/logs/app.log

# MCP server logs
# Check individual MCP server outputs in terminal

# Frontend logs
# Check browser developer console
```

## Support

- 📧 **Email:** support@companybrain.dev
- 📚 **Documentation:** [docs/](./docs/)
- 🐛 **Issues:** GitHub Issues
- 💬 **Discussions:** GitHub Discussions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Next Steps:**
1. Complete the setup process above
2. Test the demo functionality
3. Configure your business system integrations
4. Customize the UI for your team's needs
5. Deploy to production