import { Request, Response } from 'express';
import { Int, NVarChar } from 'mssql';

import { executeProcedure } from './executeProcedure';

async function CreateStatus(req: Request, res: Response) {
    const { Name } = req.body;
    await executeProcedure(res, 
        'SPCreateStatus', 
        [{ name: 'Name', type: NVarChar(255), value: Name }], 
        201, 
        "Status created successfully", 
        "Status not created");
};

async function ReadAllStatus(req: Request, res: Response) {
    await executeProcedure(res, 
        'SPReadAllStatus', 
        [], 
        200, 
        "", 
        "Status not retrieved");
};

async function ReadStatusByID(req: Request, res: Response) {
    const IDStatus = req.params.id;
    await executeProcedure(res, 
        'SPReadStatusByID', 
        [{ name: 'IDStatus', type: Int, value: IDStatus }], 
        200, 
        "", 
        "Status not retrieved");
};

async function UpdateStatus(req: Request, res: Response) {
    const IDStatus = req.params.id;
    const { Name } = req.body;
    await executeProcedure(res, 
        'SPUpdateStatus', 
        [
            { name: 'IDStatus', type: Int, value: IDStatus },
            { name: 'NewName', type: NVarChar(255), value: Name }
        ], 
        201,
        "Status updated successfully", 
        "Status not updated");
};

async function DeleteStatus(req: Request, res: Response) {
    const IDStatus = req.params.id;
    await executeProcedure(res, 
        'SPDeleteStatus', 
        [{ name: 'IDStatus', type: Int, value: IDStatus }], 
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