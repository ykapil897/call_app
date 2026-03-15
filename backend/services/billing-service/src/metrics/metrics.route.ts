import { FastifyInstance } from "fastify";
import client from "prom-client";

if (!client.register.getSingleMetric("process_cpu_user_seconds_total")) {
  client.collectDefaultMetrics();
}

export async function metricsRoute(app: FastifyInstance) {

  app.get("/metrics", async (_req, reply) => {
    reply.header("Content-Type", client.register.contentType);
    return client.register.metrics();
  });

}