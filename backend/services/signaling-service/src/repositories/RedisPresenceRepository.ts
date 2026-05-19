import { redisClient }
  from "../infrastructure/RedisClient";

import { PresenceRepository }
  from "./PresenceRepository";

export class RedisPresenceRepository
  implements PresenceRepository {

  async setOnline(
    userId: string,
    socketId: string
  ) {

    await redisClient.set(
      `presence:${userId}`,
      socketId,
      {
        EX: 60
      }
    );

  }

  async refresh(userId: string) {

    await redisClient.expire(
      `presence:${userId}`,
      60
    );

  }

  async remove(userId: string) {

    await redisClient.del(
      `presence:${userId}`
    );

  }

  async getSocketId(
    userId: string
  ) {

    return redisClient.get(
      `presence:${userId}`
    );

  }

  async getOnlineUsers(): Promise<string[]> {

    const keys =
      await redisClient.keys(
        "presence:*"
      );

    return keys.map(
      key => key.replace(
        "presence:",
        ""
      )
    );

  }

  async isOnline(
    userId: string
  ): Promise<boolean> {

    const socketId =
      await this.getSocketId(
        userId
      );

    return !!socketId;

  }

}