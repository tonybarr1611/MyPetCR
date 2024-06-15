import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreateStatus(req: Request, res: Response) {
    const { Name } = req.body;

    if (!Name) {
        return res.status(400).send("Name is required");
    }

    await executeProcedure(res, 
        'CreateStatus', 
        [{ name: 'Name', type: sql.NVarChar(255), value: Name }], 
        201, 
        "Status created successfully", 
        "Status not created");
};

async function ReadAllStatus(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllStatuses', 
        [], 
        200, 
        "", 
        "Status not retrieved");
};

async function ReadStatusByID(req: Request, res: Response) {
    const IDStatus = req.params.id;

    await executeProcedure(res, 
        'ReadByIDStatus', 
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }], 
        200, 
        "", 
        "Status not retrieved");
};

async function UpdateStatus(req: Request, res: Response) {
    const IDStatus = req.params.id;
    
    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Status not found"); }

    const Name = req.body.Name || status?.recordset[0].Name;

    await executeProcedure(res, 
        'UpdateStatus', 
        [
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'NewName', type: sql.NVarChar(255), value: Name }
        ], 
        201,
        "Status updated successfully", 
        "Status not updated");
};

async function DeleteStatus(req: Request, res: Response) {
    const IDStatus = req.params.id;
    
    await executeProcedure(res, 
        'DeleteStatus', 
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }], 
        201, 
        "Status removed successfully", 
        "Status not removed");
};

export default {
    CreateStatus,
    ReadAllStatus,
    ReadStatusByID,
    UpdateStatus,
    DeleteStatus,
}