import { FastifyInstance } from "fastify";
import { CallController } from "../controllers/CallController";

export async function callRoutes(app: FastifyInstance) {

  app.post("/call/initiate", CallController.initiate);

  app.post("/call/answer", CallController.answer);

  app.post("/call/hangup", CallController.hangup);

}