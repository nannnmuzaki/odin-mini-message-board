import { pool } from "../db/pool.js";
import { randomUUIDv7 } from "node:crypto";

export const Message = {
  async findAll() {
    const { rows } = await pool.query(
      `SELECT id, username, text, created_at, updated_at
       FROM messages`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, username, text, created_at, updated_at
       FROM messages
       WHERE id = $1`,
      [id]
    )
    return rows[0];
  },

  async create(username, text) {
    const { rows } = await pool.query(
      `INSERT INTO messages(id, username, text)
       VALUES($1, $2, $3)
       RETURNING *`,
      [randomUUIDv7(), username, text]
    )

    return rows[0];
  },

  async update(id, updatedMessage) {
    const { username, text } = updatedMessage;
    const { rows } = await pool.query(
      `UPDATE messages
       SET username = $2, text = $3, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, username, text]
    )

    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM messages
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return rows[0];
  }
}
