import * as dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const db_URL = process.env.DATABASE_URL

const pool = new Pool(
    {
        connectionString: db_URL, 
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
    }
);

export default pool;