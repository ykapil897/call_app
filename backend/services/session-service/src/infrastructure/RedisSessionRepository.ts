import { redisClient } from "./redis";
import { SessionRepository } from "../repositories/SessionRepository";
import { Session } from "../domain/Session";

export class RedisSessionRepository implements SessionRepository {

  async create(session: Session) {

    const key = `session:${session.sessionId}`;

    await redisClient.set(
      key,
      JSON.stringify(session),
      { EX: 60 }
    );

    await redisClient.sAdd(
      `user_sessions:${session.userId}`,
      session.sessionId
    );

  }

  async heartbeat(sessionId: string) {

    const key = `session:${sessionId}`;

    await redisClient.expire(key, 60);

  }

  async remove(sessionId: string) {

    await redisClient.del(`session:${sessionId}`);

  }

  async findByUser(userId: string): Promise<Session[]> {

    const sessionIds = await redisClient.sMembers(
      `user_sessions:${userId}`
    );

    const sessions: Session[] = [];

    for (const id of sessionIds) {

      const data = await redisClient.get(`session:${id}`);

      if (!data) continue;

      sessions.push(JSON.parse(data));

    }

    return sessions;

  }

}