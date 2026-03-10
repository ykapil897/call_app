import { FastifyInstance } from "fastify";
import { SessionController } from "../controllers/SessionController";

export async function sessionRoutes(app: FastifyInstance) {

  app.post("/session/create", SessionController.create);

}