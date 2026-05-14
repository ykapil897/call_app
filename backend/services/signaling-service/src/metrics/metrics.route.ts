import { AppInstance }
  from "../types/express";

import client from "prom-client";

if (
  !client.register.getSingleMetric(
    "process_cpu_user_seconds_total"
  )
) {

  client.collectDefaultMetrics();

}

export function metricsRoute(
  app: AppInstance
) {

  app.get(
    "/metrics",
    async (_req, res) => {

      res.setHeader(
        "Content-Type",
        client.register.contentType
      );

      res.end(
        await client.register.metrics()
      );

    }
  );

}