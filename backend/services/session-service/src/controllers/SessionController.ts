import { SessionFactory } from "../factories/SessionFactory";
import { FastifyRequest, FastifyReply } from "fastify";

export class SessionController {

  static async create(req: FastifyRequest, reply: FastifyReply) {

    const { userId, deviceType } = req.body as any;

    const services = SessionFactory.build();

    const session = await services.createSession.execute(
      userId,
      deviceType
    );

    return {
      success: true,
      data: { sessionId: session.sessionId },
      meta: { serverTime: Date.now() }
    };

  }

}