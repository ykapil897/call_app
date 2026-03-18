import { CallRecord } from "../domain/CallRecord"

export interface HistoryRepository {

  save(record: CallRecord): Promise<void>

  fetchHistory(
    userId: string,
    cursor: string | null,
    limit: number
  ): Promise<any[]>

}