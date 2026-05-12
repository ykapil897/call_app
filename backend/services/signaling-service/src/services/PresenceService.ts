import { PresenceRepository }
  from "../repositories/PresenceRepository";

export class PresenceService {

  constructor(
    private repo: PresenceRepository
  ) {}

  async setOnline(
    userId: string,
    socketId: string
  ) {

    await this.repo.setOnline(
      userId,
      socketId
    );

  }

  async remove(userId: string) {

    await this.repo.remove(
      userId
    );

  }

  async getSocketId(
    userId: string
  ) {

    return this.repo.getSocketId(
      userId
    );

  }

}