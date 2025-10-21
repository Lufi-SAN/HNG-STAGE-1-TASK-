require('dotenv').config()
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS strings (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  string TEXT UNIQUE,
  palindrome BOOLEAN,
  length INTEGER,
  word_count INTEGER
);`

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
}

main()
