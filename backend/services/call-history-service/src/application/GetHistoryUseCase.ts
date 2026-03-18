import { HistoryRepository } from "../repositories/HistoryRepository"

export class GetHistoryUseCase {

  constructor(private repo: HistoryRepository) {}

  async execute(userId: string, cursor: string | null, limit: number) {

    return this.repo.fetchHistory(userId, cursor, limit)

  }

}