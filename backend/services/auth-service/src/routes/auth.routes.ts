import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/AuthController";

export async function authRoutes(app: FastifyInstance) {

  app.post("/login", AuthController.login);

  app.post("/logout", async () => ({
    success: true,
    data: {},
    meta: { serverTime: Date.now() }
  }));

  app.get("/user", AuthController.getUser);

  app.post("/register", AuthController.register);
}