import { FastifyInstance }
  from "fastify";

import { SignalingController }
  from "../controllers/SignalingController";

export async function signalingRoutes(
  app: FastifyInstance
) {

  app.get(
    "/signaling/status",
    SignalingController.status
  );

}