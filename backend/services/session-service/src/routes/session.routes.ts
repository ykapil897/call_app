import { FastifyInstance } from "fastify";
import { SessionController } from "../controllers/SessionController";

export async function sessionRoutes(app: FastifyInstance) {

  app.post("/session/create", SessionController.create);

  app.post("/session/heartbeat", SessionController.heartbeat);

  app.post("/session/logout", SessionController.logout);

  app.get("/session/active", SessionController.active);

}