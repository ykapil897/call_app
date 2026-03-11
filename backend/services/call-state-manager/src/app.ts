import Fastify from "fastify";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { callRoutes } from "./routes/call.routes";

export function buildApp() {

  const app = Fastify({
    logger: {
      level: "info"
    }
  });

  healthRoute(app);
  metricsRoute(app);
  callRoutes(app);

  return app;
}