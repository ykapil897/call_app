import { FastifyInstance } from "fastify"
import { SwitchController } from "../controllers/SwitchController"

export async function switchRoutes(app: FastifyInstance) {

  app.post("/switch/start", SwitchController.start)

  app.post("/switch/stop", SwitchController.stop)

}