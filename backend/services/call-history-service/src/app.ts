import Fastify from "fastify";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { historyRoutes } from "./routes/history.routes";

export function buildApp() {

  const app = Fastify({
    logger: {
      level: "info"
    }
  });

  healthRoute(app);
  metricsRoute(app);
  historyRoutes(app);

  return app;
}