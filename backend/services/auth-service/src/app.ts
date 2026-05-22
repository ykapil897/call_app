import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { authRoutes } from "./routes/auth.routes";

export async function buildApp() {

  const app = Fastify({
    logger: { level: "info" }
  });

  await app.register(
    fastifyCors,
    {
      origin: true,
      credentials: true
  });

  healthRoute(app);
  metricsRoute(app);
  authRoutes(app);

  return app;
}