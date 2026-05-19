import { FastifyInstance } from "fastify";
import proxy from "@fastify/http-proxy";
import { services } from "../config/services.config";
import { jwtMiddleware } from "../middleware/jwt.middleware";
import { rateLimiter } from "../decorators/rateLimiter.decorator";
import { requestRate } from "../metrics/gateway.metrics";

export async function gatewayRoutes(app: FastifyInstance) {

  app.addHook("onRequest", async (req, reply) => {

    requestRate.inc();

    await rateLimiter(req, reply);

  });

  app.register(proxy, {
    upstream: services.auth,
    prefix: "/auth"
  });

  app.register(proxy, {
    upstream: services.session,
    prefix: "/session",
    preHandler: jwtMiddleware
  });

  app.register(proxy, {
    upstream: services.call,
    prefix: "/call",
    preHandler: jwtMiddleware
  });

  app.register(proxy, {
    upstream: services.billing,
    prefix: "/billing",
    preHandler: jwtMiddleware
  });

    app.register(proxy, {
    upstream: services.signaling,
    prefix: "/signaling",
    preHandler: jwtMiddleware
  });

}