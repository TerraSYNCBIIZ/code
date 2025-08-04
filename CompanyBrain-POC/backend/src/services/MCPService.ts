import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

export interface MCPServer {
  name: string;
  command: string;
  args: string[];
  process?: ChildProcess;
  connected: boolean;
  lastError?: string;
}

export interface MCPRequest {
  method: string;
  params?: any;
  server?: string;
}

export interface MCPResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class MCPService extends EventEmitter {
  private servers: Map<string, MCPServer> = new Map();
  private initialized = false;

  constructor() {
    super();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Initialize MCP servers based on configuration
    const mcpServers = {
      'context7': {
        command: 'cmd',
        args: ['/c', 'npx', '-y', '@upstash/context7-mcp@latest']
      },
      'browser-use': {
        command: 'cmd', 
        args: ['/c', 'npx', '-y', 'browser-use[cli]', '--mcp']
      },
      'google-workspace': {
        command: 'npx',
        args: ['-y', 'supergateway', '--sse', process.env.GOOGLE_MCP_URL || '']
      },
      'pipedream': {
        command: 'npx',
        args: ['-y', '@pipedream/mcp-server']
      }
    };

    for (const [name, config] of Object.entries(mcpServers)) {
      await this.startServer(name, config.command, config.args);
    }

    this.initialized = true;
    console.log('✅ MCP Service initialized with', this.servers.size, 'servers');
  }

  private async startServer(name: string, command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const process = spawn(command, args, {
          stdio: ['pipe', 'pipe', 'pipe'],
          shell: true
        });

        const server: MCPServer = {
          name,
          command,
          args,
          process,
          connected: false
        };

        process.stdout?.on('data', (data) => {
          console.log(`[${name}] stdout:`, data.toString());
          if (!server.connected) {
            server.connected = true;
            this.emit('server-connected', name);
          }
        });

        process.stderr?.on('data', (data) => {
          const error = data.toString();
          console.error(`[${name}] stderr:`, error);
          server.lastError = error;
        });

        process.on('error', (error) => {
          console.error(`[${name}] process error:`, error);
          server.connected = false;
          server.lastError = error.message;
          this.emit('server-error', name, error);
        });

        process.on('exit', (code) => {
          console.log(`[${name}] process exited with code ${code}`);
          server.connected = false;
          this.emit('server-disconnected', name);
        });

        this.servers.set(name, server);
        
        // Give the server a moment to start
        setTimeout(() => {
          resolve();
        }, 2000);

      } catch (error) {
        console.error(`Failed to start MCP server ${name}:`, error);
        reject(error);
      }
    });
  }

  async executeCommand(request: MCPRequest): Promise<MCPResponse> {
    try {
      const { method, params, server } = request;

      // Route to specific MCP servers based on method or server parameter
      switch (method) {
        case 'context7.store':
          return await this.callContext7('store', params);
        
        case 'context7.retrieve':
          return await this.callContext7('retrieve', params);
        
        case 'browser.record':
          return await this.callBrowserUse('startRecording', params);
        
        case 'google.calendar.list':
          return await this.callGoogleWorkspace('calendar.list', params);
        
        case 'google.gmail.list':
          return await this.callGoogleWorkspace('gmail.list', params);
        
        case 'odoo.search':
          return await this.callOdoo('search', params);
        
        default:
          return {
            success: false,
            error: `Unknown method: ${method}`
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async callContext7(action: string, params: any): Promise<MCPResponse> {
    // Mock implementation - in real app, communicate with Context7 MCP
    console.log(`[Context7] ${action}:`, params);
    
    if (action === 'store') {
      return {
        success: true,
        data: { stored: true, id: Date.now().toString() }
      };
    } else if (action === 'retrieve') {
      return {
        success: true,
        data: { 
          context: `Retrieved context for user ${params.userId}`,
          history: [
            { timestamp: new Date(), content: 'Previous meeting notes' },
            { timestamp: new Date(), content: 'Document discussions' }
          ]
        }
      };
    }

    return { success: false, error: 'Unknown Context7 action' };
  }

  private async callBrowserUse(action: string, params: any): Promise<MCPResponse> {
    // Mock implementation - in real app, communicate with browser-use MCP
    console.log(`[Browser-use] ${action}:`, params);
    
    if (action === 'startRecording') {
      return {
        success: true,
        data: { 
          recording: true, 
          sessionId: Date.now().toString(),
          transcription: true
        }
      };
    }

    return { success: false, error: 'Unknown browser-use action' };
  }

  private async callGoogleWorkspace(endpoint: string, params: any): Promise<MCPResponse> {
    // Mock implementation - in real app, communicate with Google Workspace MCPs
    console.log(`[Google Workspace] ${endpoint}:`, params);
    
    if (endpoint === 'calendar.list') {
      return {
        success: true,
        data: {
          events: [
            {
              id: '1',
              title: 'Q4 Budget Review',
              start: '2025-01-15T09:00:00Z',
              end: '2025-01-15T10:00:00Z',
              attendees: ['john@company.com', 'sarah@company.com']
            },
            {
              id: '2',
              title: 'Client Call - TechCorp',
              start: '2025-01-15T14:00:00Z',
              end: '2025-01-15T14:30:00Z',
              attendees: ['mike@techcorp.com']
            }
          ]
        }
      };
    } else if (endpoint === 'gmail.list') {
      return {
        success: true,
        data: {
          emails: [
            {
              id: '1',
              subject: 'Contract Review Required',
              sender: 'legal@company.com',
              timestamp: new Date().toISOString(),
              unread: true,
              priority: 'high'
            },
            {
              id: '2',
              subject: 'Q4 Marketing Strategy',
              sender: 'sarah@company.com',
              timestamp: new Date().toISOString(),
              unread: true,
              priority: 'medium'
            }
          ]
        }
      };
    }

    return { success: false, error: 'Unknown Google Workspace endpoint' };
  }

  private async callOdoo(action: string, params: any): Promise<MCPResponse> {
    // Mock implementation - in real app, communicate with Odoo MCP
    console.log(`[Odoo] ${action}:`, params);
    
    if (action === 'search') {
      return {
        success: true,
        data: {
          records: [
            {
              id: 1,
              name: 'TechCorp Deal',
              stage: 'Proposal',
              value: 50000,
              probability: 75
            },
            {
              id: 2,
              name: 'Alpha Project',
              stage: 'Negotiation',
              value: 25000,
              probability: 60
            }
          ]
        }
      };
    }

    return { success: false, error: 'Unknown Odoo action' };
  }

  isConnected(): boolean {
    return Array.from(this.servers.values()).some(server => server.connected);
  }

  getServerStatus(): { [key: string]: { connected: boolean; lastError?: string } } {
    const status: any = {};
    
    for (const [name, server] of this.servers) {
      status[name] = {
        connected: server.connected,
        lastError: server.lastError
      };
    }

    return status;
  }

  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down MCP servers...');
    
    for (const [name, server] of this.servers) {
      if (server.process && !server.process.killed) {
        console.log(`Terminating ${name}...`);
        server.process.kill();
      }
    }

    this.servers.clear();
    this.initialized = false;
    console.log('✅ MCP servers shut down');
  }
}