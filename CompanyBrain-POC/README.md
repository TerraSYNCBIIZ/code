# CompanyBrain - AI Employee Assistant POC

A personalized AI business assistant that connects to your business systems via Model Context Protocol (MCP), providing employees with a unified interface to Odoo, Google Workspace, and custom workflows.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend      │    │   MCP Layer     │
│   (Refine +     │◄──►│   (Node.js +     │◄──►│   (Pipedream +  │
│   Shadcn UI)    │    │   Express)       │    │   Context7)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ User Interface  │    │ API Gateway      │    │ Business Systems│
│ • Dashboard     │    │ • Authentication │    │ • Odoo ERP      │
│ • Chat          │    │ • MCP Proxy      │    │ • Google Workspace│
│ • Voice         │    │ • Memory Store   │    │ • Browser-use   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Technology Stack

### Frontend
- **Framework**: [Refine](https://refine.dev/) - React-based framework for admin panels
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) - Modern component library
- **Styling**: Tailwind CSS
- **State Management**: React Query (built into Refine)
- **Voice**: Web Audio API + MediaRecorder

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **MCP Integration**: [Pipedream MCP](https://github.com/PipedreamHQ/mcp)
- **Authentication**: JWT + Auth0 (or similar)
- **Database**: PostgreSQL for user data
- **Memory**: Context7 MCP for personal storage

### AI & Integrations
- **LLM**: Claude 3.5 Sonnet (Anthropic API)
- **Voice Transcription**: OpenAI Whisper
- **Business Systems**: 
  - Odoo ERP (via MCP)
  - Google Workspace (Docs, Calendar, Gmail)
  - Browser automation (browser-use MCP)

## 📁 Project Structure

```
CompanyBrain-POC/
├── frontend/                 # Refine + Shadcn UI app
│   ├── src/
│   │   ├── components/      # Shadcn UI components
│   │   ├── pages/          # Refine pages
│   │   ├── providers/      # Auth & data providers
│   │   └── hooks/          # Custom hooks
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # API endpoints
│   │   ├── middleware/     # Auth, CORS, etc.
│   │   ├── services/       # MCP integrations
│   │   └── models/         # Data models
│   ├── package.json
│   └── .env.example
├── config/                  # MCP configurations
│   ├── .mcp.json           # MCP server definitions
│   └── claude-config.json  # Claude Desktop config
├── docs/                    # Documentation
│   ├── implementation-plan.md
│   ├── api-reference.md
│   └── deployment.md
└── README.md
```

## 🔧 MCP Integrations

### Current MCPs
- **Context7**: Personal memory and context storage
- **Browser-use**: Web automation and recording
- **Google Workspace**: Docs, Calendar, Gmail access
- **Odoo**: ERP system integration
- **Pipedream**: Workflow automation

### Key Features per MCP
```typescript
// Context7 - Personal Memory
await context7.store({
  userId: "user123",
  context: "Meeting with client about Q4 budget",
  metadata: { date: "2025-01-15", type: "meeting" }
});

// Browser-use - Recording
await browserUse.startRecording({
  source: "microphone",
  transcribe: true,
  saveToContext: true
});

// Google Calendar - Meeting Management
await googleCalendar.createEvent({
  title: "Follow-up with Sarah",
  attendees: ["sarah@company.com"],
  datetime: "2025-01-16T14:00:00Z"
});
```

## 🎯 Core Features

### 1. Personal Dashboard
- Today's schedule with AI-generated meeting prep
- Recent emails requiring action
- Task list from connected systems
- Personal productivity metrics

### 2. AI Chat Interface
- Natural language commands to business systems
- Context-aware responses using personal memory
- Voice input/output capabilities
- Action buttons for quick system access

### 3. Voice & Recording
- Meeting/call recording with auto-transcription
- Voice commands for common tasks
- Personal context storage for all interactions
- Smart summaries and action items

### 4. Smart Actions
```typescript
// Example user interactions:
"Schedule a meeting with John about the Q4 proposal"
"What did we discuss in yesterday's client call?"
"Show me my tasks for this week"
"Record this call and create action items"
"Find the contract we discussed last month"
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (for user data)
- Anthropic API key
- Google Workspace credentials
- Odoo instance access

### Installation

1. **Clone and setup**:
```bash
cd CompanyBrain-POC
npm run setup  # Installs all dependencies
```

2. **Configure environment**:
```bash
cp backend/.env.example backend/.env
# Add your API keys and database credentials
```

3. **Setup MCPs**:
```bash
# Copy MCP config to Claude Desktop
cp config/.mcp.json ~/.config/claude/
```

4. **Start development**:
```bash
npm run dev  # Starts both frontend and backend
```

## 🔐 Authentication & Security

- **User Authentication**: JWT tokens with refresh mechanism
- **MCP Security**: Per-user credential isolation
- **Data Encryption**: All sensitive data encrypted at rest
- **API Security**: Rate limiting and request validation

## 📊 Personal Memory System

Each user gets:
- **Conversation History**: All AI interactions stored
- **Document Context**: Links to relevant files and emails
- **Meeting Transcripts**: Searchable call recordings
- **Task Relationships**: Connected workflows and dependencies
- **Preference Learning**: Personalized response patterns

## 🚀 Deployment

### Development
```bash
npm run dev        # Local development
npm run test       # Run test suite
npm run build      # Production build
```

### Production
- **Frontend**: Vercel/Netlify deployment
- **Backend**: DigitalOcean App Platform
- **Database**: Managed PostgreSQL
- **MCPs**: Serverless functions

## 📈 Roadmap

### Phase 1 (Current POC)
- [x] Basic Refine frontend
- [x] MCP integration layer
- [x] Personal memory storage
- [ ] Voice recording
- [ ] Authentication system

### Phase 2
- [ ] Advanced AI workflows
- [ ] Mobile app support
- [ ] Advanced analytics
- [ ] Multi-team support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@companybrain.dev
- 📚 Documentation: [docs/](docs/)
- 🐛 Issues: [GitHub Issues](https://github.com/yourorg/companybrain-poc/issues)

---

**Built with ❤️ using modern AI and web technologies**