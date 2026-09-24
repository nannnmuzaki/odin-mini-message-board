import { messages } from "../db/messages.js"
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
       VALUES($1, $2, $3) RETURNING *`,
      [randomUUIDv7(), username, text]
    )

    return rows[0];
  },

  update(id, updatedMessage) {
    const index = messages.findIndex(message => message.id === id);
    if (index === -1) return null;

    messages[index] = { ...messages[index], ...updatedMessage };

    return messages[index];
  },

  delete(id) {
    const index = messages.findIndex(message => message.id = id);
    if (index === -1) return null;

    const deletedData = { ...messages[index] };

    messages.splice(index, 1);
    return deletedData;
  }
}
