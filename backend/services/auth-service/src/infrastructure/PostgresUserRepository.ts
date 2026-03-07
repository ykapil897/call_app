import { pool } from "./db";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../domain/User";

export class PostgresUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<User | null> {

    const result = await pool.query(
      "SELECT id,email,password_hash FROM users WHERE email=$1",
      [email]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];

    return new User(
      row.id,
      row.email,
      row.password_hash
    );
  }
}