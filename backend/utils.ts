import { pool } from './db';
import sql from 'mssql';

export const getUserEmailById = async (userId: number): Promise<string> => {
    const query = 'EXEC GetUserEmailById @userId';
    const connection = await pool;
    const result = await connection.request().input('userId', sql.Int, userId).query(query);
    return result.recordset[0].LoginID;
};

export const getAdminEmails = async (): Promise<string[]> => {
    const query = 'EXEC GetAdminEmails';
    const connection = await pool;
    const result = await connection.request().query(query);
    return result.recordset.map((record: any) => record.LoginID);
};

export const getManagerEmails = async (): Promise<string[]> => {
    const query = 'EXEC GetManagerEmails';
    const connection = await pool;
    const result = await connection.request().query(query);
    return result.recordset.map((record: any) => record.LoginID);
};