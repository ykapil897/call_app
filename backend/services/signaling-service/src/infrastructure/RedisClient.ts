import { createClient } from "redis";

export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

export async function connectRedis() {

  if (!redisClient.isOpen) {

    await redisClient.connect();

    console.log("Redis connected");

  }

}