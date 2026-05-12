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

}