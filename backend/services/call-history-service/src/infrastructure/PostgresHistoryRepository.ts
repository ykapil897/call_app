import { pool } from "../config/db.config"
import { HistoryRepository } from "../repositories/HistoryRepository"
import { CallRecord } from "../domain/CallRecord"

export class PostgresHistoryRepository implements HistoryRepository {

  async save(record: CallRecord) {

    await pool.query(
      `
      INSERT INTO call_history
      VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (call_id) DO NOTHING
      `,
      [
        record.callId,
        record.callerId,
        record.calleeId,
        record.duration,
        new Date(record.endedAt)
      ]
    )

  }

  async fetchHistory(userId: string, cursor: string | null, limit: number) {

    let query = `
      SELECT *
      FROM call_history
      WHERE caller_id=$1 OR callee_id=$1
    `

    const params: any[] = [userId]

    if (cursor) {
      query += ` AND ended_at < $2`
      params.push(new Date(cursor))
    }

    query += `
      ORDER BY ended_at DESC
      LIMIT $${params.length + 1}
    `

    params.push(limit)

    const res = await pool.query(query, params)

    return res.rows

  }

}