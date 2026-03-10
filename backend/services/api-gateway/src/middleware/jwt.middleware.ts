import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function jwtMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const auth = req.headers.authorization;

  if (!auth) {
    return reply.status(401).send({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Missing token",
        retryable: false
      },
      meta: { serverTime: Date.now() }
    });
  }

  const token = auth.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    (req as any).user = decoded;

  } catch {

    return reply.status(401).send({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Token invalid",
        retryable: false
      },
      meta: { serverTime: Date.now() }
    });

  }

}