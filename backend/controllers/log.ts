import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllLogs(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAlllogs',
        [],
        200,
        "Log retrieved successfully",
        "Log types not retrieved");
}

async function LogById(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'ReadByIDLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Log retrieved successfully",
        "Log not retrieved");
}

async function CreateLog(req: Request, res: Response) {
    const { IDLogType, IDUser, DateTime, Description } = req.body; 

    //validate the json
    if (!IDLogType || !IDUser || !DateTime || !Description) {
        return res.status(400).send("Missing required fields");}
    
    //validate idLogType
    const logType = await getObject(res,
        'ReadByIDLogType',
        [{ name: 'IDLogType', type: sql.Int, value: IDLogType }],
        200,
        "Log retrieved successfully",
        "Log not retrieved");
    if (!logType || logType.recordset.length === 0) { return res.status(404).send("Log type not found"); }

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { return res.status(404).send("User not found"); }

    //Create the log
    await executeProcedure(res,
        'CreateLog',
        [{ name: 'IDLogType', type: sql.Int, value: IDLogType },
        { name: 'IDUser', type: sql.Int, value: IDUser },
        { name: 'DateTime', type: sql.DateTime, value: DateTime },
        { name: 'Description', type: sql.NVarChar, value: Description }],
        201,
        "Log created successfully",
        "Log not created");
};

async function UpdateLog(req: Request, res: Response) {
    const IDLog = req.params.id;
    let { IDLogType, IDUser, DateTime, Description } = req.body;

    //search for the log to update
    const log = await getObject(res,
        'ReadByIDLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Log retrieved successfully",
        "Log not retrieved");
    if (!log || log.recordset.length === 0) return res.status(404).send("Log not found");

    //validate the json
    IDLogType = IDLogType || log.recordset[0].IDLogType;
    IDUser = IDUser || log.recordset[0].IDUser;
    DateTime = DateTime || log.recordset[0].DateTime;
    Description = Description || log.recordset[0].Description;

    //validate idLogType
    const logType = await getObject(res,
        'ReadByIDLogType',
        [{ name: 'IDLogType', type: sql.Int, value: IDLogType }],
        200,
        "Log type retrieved successfully",
        "Log type not retrieved");

    if (!logType || logType.recordset.length === 0) { return res.status(404).send("Log type not found"); }

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { return res.status(404).send("User not found"); }

    //update the log
    await executeProcedure(res,
        'UpdateLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog },
        { name: 'IDLogType', type: sql.Int, value: IDLogType },
        { name: 'IDUser', type: sql.Int, value: IDUser },
        { name: 'DateTime', type: sql.DateTime, value: DateTime },
        { name: 'Description', type: sql.NVarChar, value: Description }],
        200,
        "Log updated successfully",
        "Log not updated");
};

async function DeleteLog(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'DeleteLog',
        [{ name: 'IDLog', type: sql.Int, value: IDLog }],
        200,
        "Log deleted successfully",
        "Log not deleted");
}

export default {
    AllLogs,
    LogById,
    CreateLog,
    UpdateLog,
    DeleteLog
};