import { pool } from "../config/db.config";
import { BillingRepository } from "../repositories/BillingRepository";
import { Invoice } from "../domain/Invoice";

export class PostgresBillingRepository implements BillingRepository {

  async lockBalance(userId: string, amount: number): Promise<boolean> {

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const res = await client.query(
        "SELECT balance FROM balances WHERE user_id=$1 FOR UPDATE",
        [userId]
      );

      const balance = res.rows[0].balance;

      if (balance < amount) {
        await client.query("ROLLBACK");
        return false;
      }

      await client.query(
        "UPDATE balances SET balance = balance - $1 WHERE user_id=$2",
        [amount, userId]
      );

      await client.query("COMMIT");

      return true;

    } finally {
      client.release();
    }

  }

  async createInvoice(invoice: Invoice) {

    await pool.query(
      "INSERT INTO invoices VALUES ($1,$2,$3)",
      [invoice.invoiceId, invoice.callId, invoice.amount]
    );

  }

  async invoiceExists(callId: string): Promise<boolean> {

    const res = await pool.query(
      "SELECT 1 FROM invoices WHERE call_id=$1",
      [callId]
    );

    return res.rows.length > 0;

  }

}