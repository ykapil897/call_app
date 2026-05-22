import { FastifyInstance } from "fastify";
import { CallController } from "../controllers/CallController";

export async function callRoutes(app: FastifyInstance) {

  app.post("/initiate", CallController.initiate);

  app.post("/answer", CallController.answer);

  app.post("/hangup", CallController.hangup);
}