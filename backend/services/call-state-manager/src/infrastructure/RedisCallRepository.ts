import { CallRepository } from "../repositories/CallRepository";
import { Call } from "../domain/Call";
import { redisClient } from "./RedisClient";

export class RedisCallRepository implements CallRepository {

  async save(call: Call) {

    await redisClient.set(
      `call:${call.callId}`,
      JSON.stringify(call)
    );

  }

  async find(callId: string): Promise<Call | null> {

    const data = await redisClient.get(`call:${callId}`);

    if (!data) return null;

    const parsed = JSON.parse(data);

    return new Call(
      parsed.callId,
      parsed.state,
      parsed.participants,
      parsed.mediaType
    );

  }

}