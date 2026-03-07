import Fastify from "fastify";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { authRoutes } from "./routes/auth.routes";

export function buildApp() {

  const app = Fastify({
    logger: { level: "info" }
  });

  healthRoute(app);
  metricsRoute(app);
  authRoutes(app);

  return app;
}