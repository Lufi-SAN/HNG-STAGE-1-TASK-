require('dotenv').config()
const { Pool } = require('pg');

const db_URL = process.env.DATABASE_URL

module.exports = new Pool({db_URL})