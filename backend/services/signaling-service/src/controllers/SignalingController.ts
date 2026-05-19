import {
  Request,
  Response
} from "express";

import {
  PresenceService
} from "../services/PresenceService";

import {
  RedisPresenceRepository
} from "../repositories/RedisPresenceRepository";

export class SignalingController {

  static async status(
    _req: Request,
    res: Response
  ) {

    res.send({
      success: true,
      data: {
        service: "signaling-service"
      },
      meta: {
        serverTime: Date.now()
      }
    });

  }

  static async onlineUsers(
    _req: Request,
    res: Response
  ) {

    const service =
      new PresenceService(
        new RedisPresenceRepository()
      );

    const users =
      await service.getOnlineUsers();

    res.send({
      success: true,
      data: {
        users
      },
      meta: {
        serverTime: Date.now()
      }
    });

  }

  static async presence(
    req: Request,
    res: Response
  ) {

    const { userId } =
      req.query as any;

    const service =
      new PresenceService(
        new RedisPresenceRepository()
      );

    const online =
      await service.isOnline(
        userId
      );

    res.send({
      success: true,
      data: {
        online
      },
      meta: {
        serverTime: Date.now()
      }
    });

  }

}