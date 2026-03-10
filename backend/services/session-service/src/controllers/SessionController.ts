import { FastifyRequest, FastifyReply } from "fastify";
import { SessionFactory } from "../factories/SessionFactory";

const services = SessionFactory.build();

export class SessionController {

  static async create(req: FastifyRequest, reply: FastifyReply) {

    const { userId, deviceType } = req.body as any;

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

  static async heartbeat(req: FastifyRequest, reply: FastifyReply) {

    const { sessionId } = req.body as any;

    await services.heartbeat.execute(sessionId);

    return {
      success: true,
      data: {},
      meta: { serverTime: Date.now() }
    };

  }

  static async logout(req: FastifyRequest, reply: FastifyReply) {

    const { sessionId } = req.body as any;

    await services.logout.execute(sessionId);

    return {
      success: true,
      data: {},
      meta: { serverTime: Date.now() }
    };

  }

  static async active(req: FastifyRequest, reply: FastifyReply) {

    const { userId } = req.query as any;

    const sessions = await services.getActive.execute(userId);

    return {
      success: true,
      data: { sessions },
      meta: { serverTime: Date.now() }
    };

  }

}