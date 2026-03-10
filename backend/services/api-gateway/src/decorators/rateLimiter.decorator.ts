import { FastifyRequest, FastifyReply } from "fastify";
import { redisClient } from "../infrastructure/redis.client";
import { rateLimitHits } from "../metrics/gateway.metrics";

const WINDOW = 60;
const LIMIT = 100;

export async function rateLimiter(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const ip = req.ip;

  const key = `rate:${ip}`;

  const current = await redisClient.incr(key);

  if (current === 1) {
    await redisClient.expire(key, WINDOW);
  }

  if (current > LIMIT) {

    rateLimitHits.inc();

    return reply.status(429).send({
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests",
        retryable: true
      },
      meta: { serverTime: Date.now() }
    });

  }

}