import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllLogs(req: Request, res: Response) {
    await executeProcedure(res,
        'GetAlllogs',
        [],
        200,
        "Product types retrieved successfully",
        "Product types not retrieved");
}

async function LogById(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'GetLogById',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Product type retrieved successfully",
        "Product type not retrieved");
}

async function CreateLog(req: Request, res: Response) {
    const { IDLogType, IDUser, DateTime, Description } = req.body;
    //validate the json
    if (!IDLogType || !IDUser || !DateTime || !Description) {
        return res.status(400).send("Missing required fields");}

    await executeProcedure(res,
        'CreateLog',
        [{ name: 'IDLogType', type: sql.Int, value: IDLogType },
        { name: 'IDUser', type: sql.Int, value: IDUser },
        { name: 'DateTime', type: sql.DateTime, value: DateTime },
        { name: 'Description', type: sql.NVarChar, value: Description }],
        201,
        "Product type created successfully",
        "Product type not created");
};

async function UpdateLog(req: Request, res: Response) {
    const IDLog = req.params.id;
    let { IDLogType, IDUser, DateTime, Description } = req.body;
    //search for the log to update
    const log = await getObject(res,
        'GetLogById',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Log retrieved successfully",
        "Log not retrieved");
    if (!log) return res.status(404).send("Log not found");

    //validate the json
    IDLogType = IDLogType || log.recordset[0].IDLogType;
    IDUser = IDUser || log.recordset[0].IDUser;
    DateTime = DateTime || log.recordset[0].DateTime;
    Description = Description || log.recordset[0].Description;

    //update the log
    await executeProcedure(res,
        'UpdateLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog },
        { name: 'IDLogType', type: sql.Int, value: IDLogType },
        { name: 'IDUser', type: sql.Int, value: IDUser },
        { name: 'DateTime', type: sql.DateTime, value: DateTime },
        { name: 'Description', type: sql.NVarChar, value: Description }],
        200,
        "Product type updated successfully",
        "Product type not updated");
};

async function DeleteLog(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'DeleteLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Product type deleted successfully",
        "Product type not deleted");
}

export default {
    AllLogs,
    LogById,
    CreateLog,
    UpdateLog,
    DeleteLog
};