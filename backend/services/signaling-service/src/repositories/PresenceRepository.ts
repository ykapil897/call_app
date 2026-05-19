export interface PresenceRepository {

  setOnline(
    userId: string,
    socketId: string
  ): Promise<void>;

  refresh(userId: string): Promise<void>;

  remove(
    userId: string
  ): Promise<void>;

  getSocketId(
    userId: string
  ): Promise<string | null>;

  getOnlineUsers(): Promise<string[]>;

  isOnline(userId: string): Promise<boolean>;
}