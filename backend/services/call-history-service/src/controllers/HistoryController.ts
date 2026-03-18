import { PostgresHistoryRepository } from "../infrastructure/PostgresHistoryRepository"
import { GetHistoryUseCase } from "../application/GetHistoryUseCase"

export class HistoryController {

  static async getHistory(req: any) {

    const userId = req.query.userId
    const cursor = req.query.cursor || null
    const limit = Number(req.query.limit || 20)

    const repo = new PostgresHistoryRepository()
    const useCase = new GetHistoryUseCase(repo)

    const history = await useCase.execute(userId, cursor, limit)

    return {
      success: true,
      data: {
        items: history,
        nextCursor: history.length
          ? history[history.length - 1].ended_at
          : null
      },
      meta: { serverTime: Date.now() }
    }

  }

}