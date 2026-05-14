import { AppInstance }
  from "../types/express";

import {
  SignalingController
} from "../controllers/SignalingController";

export function signalingRoutes(
  app: AppInstance
) {

  app.get(
    "/signaling/status",
    SignalingController.status
  );

}