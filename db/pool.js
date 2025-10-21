require('dotenv').config()
const { Pool } = require('pg');

const port = process.env.PORT || 5432

module.exports = new Pool({
    host: "localhost",
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port
})