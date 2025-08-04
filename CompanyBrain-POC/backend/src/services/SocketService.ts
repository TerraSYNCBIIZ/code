import { Server } from 'socket.io';

export class SocketService {
  private io: Server;
  private connected = false;

  constructor(io: Server) {
    this.io = io;
    this.connected = true;
  }

  isConnected(): boolean {
    return this.connected;
  }

  emitToUser(userId: string, event: string, data: any) {
    this.io.to(`user-${userId}`).emit(event, data);
  }

  emitToAll(event: string, data: any) {
    this.io.emit(event, data);
  }
}