import { pool } from "../config/db.config"
import { HistoryRepository } from "../repositories/HistoryRepository"
import { CallRecord } from "../domain/CallRecord"

export class PostgresHistoryRepository implements HistoryRepository {

  async create(record: CallRecord) {

    await pool.query(

      `
      INSERT INTO call_history (

        call_id,
        caller_id,
        callee_id,
        status,
        started_at,
        answered_at,
        ended_at,
        duration

      )

      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8
      )

      ON CONFLICT (call_id)
      DO NOTHING
      `,

      [

        record.callId,

        record.callerId,

        record.calleeId,

        record.status,

        record.startedAt
          ? new Date(record.startedAt)
          : null,

        null,

        null,

        0

      ]

    );

  }

  async updateStatus(

    callId: string,

    status: string,

    updates: any

  ) {

    await pool.query(

      `
      UPDATE call_history

      SET

        status=$1,

        answered_at=
          COALESCE($2, answered_at),

        ended_at=
          COALESCE($3, ended_at),

        duration=
          COALESCE($4, duration)

      WHERE call_id=$5
      `,

      [

        status,

        updates.answeredAt
          ? new Date(updates.answeredAt)
          : null,

        updates.endedAt
          ? new Date(updates.endedAt)
          : null,

        updates.duration || null,

        callId

      ]

    );

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