import { FastifyInstance } from "fastify"
import { HistoryController } from "../controllers/HistoryController"

export async function historyRoutes(app: FastifyInstance) {

  app.get("/call/history", HistoryController.getHistory)

}