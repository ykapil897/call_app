import { FastifyRequest, FastifyReply } from "fastify";
import { AuthFactory } from "../factories/AuthFactory";
import client from "prom-client";

const success = new client.Counter({
  name: "auth_login_success_total",
  help: "Successful logins"
});

const failure = new client.Counter({
  name: "auth_login_failure_total",
  help: "Failed logins"
});

export class AuthController {

  static async login(req: FastifyRequest, reply: FastifyReply) {

    const { identifier, password } = req.body as any;

    const useCase = AuthFactory.createLoginUseCase();

    try {

      const result = await useCase.execute(identifier, password);

      success.inc();

      return {
        success: true,
        data: result,
        meta: { serverTime: Date.now() }
      };

    } catch {

      failure.inc();

      return reply.status(401).send({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
          retryable: false
        },
        meta: { serverTime: Date.now() }
      });

    }

  }

}