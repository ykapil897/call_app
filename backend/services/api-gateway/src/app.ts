import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { gatewayRoutes } from "./routes/gateway.routes";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { connectRedis } from "./infrastructure/redis.client";

export async function buildApp() {

  await connectRedis();

  const app = Fastify({ 
    logger: {
      level: "info",
    } });

  await app.register(fastifyCors, {
    origin: true,
    credentials: true
  });

  healthRoute(app);
  metricsRoute(app);

  gatewayRoutes(app);

  return app;

}