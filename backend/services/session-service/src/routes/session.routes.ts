import { FastifyInstance } from "fastify";
import { SessionController } from "../controllers/SessionController";

export async function sessionRoutes(app: FastifyInstance) {

  app.post("/create", SessionController.create);

  app.post("/heartbeat", SessionController.heartbeat);

  app.post("/logout", SessionController.logout);
  app.get("/active", SessionController.active);

}