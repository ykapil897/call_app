import { CallRecord }
  from "../domain/CallRecord";

export interface HistoryRepository {

  create(
    record: CallRecord
  ): Promise<void>;

  updateStatus(
    callId: string,

    status: string,

    updates: any
  ): Promise<void>;

  fetchHistory(
    userId: string,

    cursor: string | null,

    limit: number

  ): Promise<any[]>;

}