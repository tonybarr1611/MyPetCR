import sql from 'mssql';
import dotenv from "dotenv";

dotenv.config();

const config = {
  server: process.env.DB_SERVER || '',
  database: process.env.DB_DATABASE || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
      encrypt: true,
      trustServerCertificate: true 
  }
};

export const pool = new sql.ConnectionPool(config)
  .connect();