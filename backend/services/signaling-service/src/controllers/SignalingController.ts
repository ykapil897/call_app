import {
  Request,
  Response
} from "express";

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

}