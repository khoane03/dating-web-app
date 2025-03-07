import pkg from "pg";
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "dating_app",
  password: process.env.DB_PASSWORD || "1",
  port: process.env.DB_PORT || 5432,
});

export default pool;
