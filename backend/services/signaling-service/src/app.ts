import Fastify from "fastify";
import cors from "@fastify/cors";

import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { signalingRoutes } from "./routes/signaling.routes";

import { connectRedis } from "./infrastructure/RedisClient";

export async function buildApp() {

  await connectRedis();

  const app = Fastify({
    logger: {
      level: "info"
    }
  });

  await app.register(cors, {
    origin: true
  });

  healthRoute(app);

  metricsRoute(app);

  signalingRoutes(app);

  return app;

}