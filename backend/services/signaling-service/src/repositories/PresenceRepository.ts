export interface PresenceRepository {

  setOnline(
    userId: string,
    socketId: string
  ): Promise<void>;

  remove(
    userId: string
  ): Promise<void>;

  getSocketId(
    userId: string
  ): Promise<string | null>;

}