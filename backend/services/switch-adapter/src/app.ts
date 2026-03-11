import Fastify from "fastify";
import { healthRoute } from "./health/health.route";
import { metricsRoute } from "./metrics/metrics.route";
import { switchRoutes } from "./routes/switch.routes";  

export function buildApp() {

  const app = Fastify({
    logger: {
      level: "info"
    }
  });

  healthRoute(app);
  metricsRoute(app);
  switchRoutes(app);

  return app;
}