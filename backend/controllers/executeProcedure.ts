import { Request, Response } from 'express';
import { pool } from "../db";

export async function executeProcedure(
    res: Response, 
    procedure: string, 
    inputs: { name: string, type: any, value: any }[], 
    successStatus: number, 
    successMessage: string,
    errorMessage: string
) {
    try {
        const connection = await pool;
        const request = connection.request();
        inputs.forEach(input => request.input(input.name, input.type, input.value));
        const result = await request.execute(procedure);
        res.status(successStatus).send(result.recordset || successMessage);
    } catch (err) {
        console.error('Database operation failed:', err);
        res.status(500).send(`Database failed: ${errorMessage}`);
    }
}

//function the same as executeProcedure but returns the object
export async function getObject(
    res: Response, 
    procedure: string, 
    inputs: { name: string, type: any, value: any }[], 
    successStatus: number, 
    successMessage: string,
    errorMessage: string
) {
    try {
        const connection = await pool;
        const request = connection.request();
        inputs.forEach(input => request.input(input.name, input.type, input.value));
        const result = await request.execute(procedure);
        return result
    } catch (err) {
        console.error('Database operation failed:', err);
        res.status(500).send(`Database failed: ${errorMessage}`);
    }
}