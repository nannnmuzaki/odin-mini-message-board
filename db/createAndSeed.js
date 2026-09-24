#! /usr/bin/env node

import { Client } from "pg";
import { loadEnvFile } from "node:process";
import { randomUUIDv7 } from "node:crypto";

try {
  loadEnvFile();
} catch (e) {} // oxlint-disable-line

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT NULL
);

INSERT INTO messages (id, username, text)
VALUES
  ('${randomUUIDv7()}', 'Bryan', 'Hola World'),
  ('${randomUUIDv7()}', 'Odin', 'Bla bla bla ble ble ble blu blu blu'),
  ('${randomUUIDv7()}', 'Damon', 'wazzawwwwwwww beijing');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
