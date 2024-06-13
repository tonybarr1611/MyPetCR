import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllLogTypes(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllLogTypes',
        [],
        200,
        "Logs retrieved successfully",
        "Logs not retrieved");
}

async function LogTypeById(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'ReadByIDLogType',
        [{ name: 'IDLogType', type: sql.Int, value: IDLog }],
        200,
        "Log retrieved successfully",
        "Log not retrieved");
}

async function CreateLogType(req: Request, res: Response) {
    const Name = req.body.Name;

    //validate the json
    if (!Name) {
        return res.status(400).send("Missing required fields");
    }

    //execute the procedure
    await executeProcedure(res,
        'CreateLogType',
        [{ name: 'Name', type: sql.NVarChar(64), value: Name }],
        201,
        "Log created successfully",
        "Log not created");
};

async function UpdateLogType(req: Request, res: Response) {
    const IDLogType = req.params.id;
    const Name = req.body.Name;

    //validate the json
    if (!IDLogType || !Name) {
        return res.status(400).send("Missing required fields");
    }

    //execute the procedure
    await executeProcedure(res,
        'UpdateLogType',
        [{ name: 'IDLogType', type: sql.Int, value: IDLogType },
        { name: 'Name', type: sql.NVarChar(64), value: Name }],
        200,
        "Log updated successfully",
        "Log not updated");
};

async function DeleteLogType(req: Request, res: Response) {
    const IDLog = req.params.id;
    await executeProcedure(res,
        'DeleteLogType',
        [{ name: 'IDLogType', type: sql.Int, value: IDLog }],
        200,
        "Log deleted successfully",
        "Log not deleted");
};

export default {
    AllLogTypes,
    LogTypeById,
    CreateLogType,
    UpdateLogType,
    DeleteLogType
};