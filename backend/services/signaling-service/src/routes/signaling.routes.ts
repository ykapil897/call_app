import { AppInstance }
  from "../types/express";

import {
  SignalingController
} from "../controllers/SignalingController";

export function signalingRoutes(
  app: AppInstance
) {

  app.get(
    "/status",
    SignalingController.status
  );

  app.get(
    "/online-users",
    SignalingController.onlineUsers
  );

  app.get(
    "/presence",
    SignalingController.presence
  );

}