import { Request, Response } from 'express';
import { Int, NVarChar } from 'mssql';

import { executeProcedure } from './executeProcedure';

async function CreatePaymentType(req: Request, res: Response) {
    const { Name } = req.body;
    await executeProcedure(res, 
        'SPCreatePaymentType', 
        [{ name: 'Name', type: NVarChar(255), value: Name }], 
        201, 
        "Payment Type created successfully", 
        "Payment Type not created");
};

async function ReadAllPaymentTypes(req: Request, res: Response) {
    await executeProcedure(res, 
        'SPReadAllPaymentType', 
        [], 
        200, 
        "Payment Types retrieved successfully", 
        "Payment Types not retrieved");
};

async function ReadPaymentTypeByID(req: Request, res: Response) {
    const IDPaymentType = req.params.id;
    await executeProcedure(res, 
        'SPReadPaymentTypeByID', 
        [{ name: 'IDPaymentType', type: Int, value: IDPaymentType }], 
        200, 
        "Payment Type retrieved successfully", 
        "Payment Type not retrieved");
};

async function UpdatePaymentType(req: Request, res: Response) {
    const IDPaymentType = req.params.id;
    const { Name } = req.body;
    await executeProcedure(res, 
        'SPUpdatePaymentType', 
        [
            { name: 'IDPaymentType', type: Int, value: IDPaymentType },
            { name: 'NewName', type: NVarChar(255), value: Name }
        ], 
        201,
        "Payment Type updated successfully", 
        "Payment Type not updated");
};

async function DeletePaymentType(req: Request, res: Response) {
    const IDPaymentType = req.params.id;
    await executeProcedure(res, 
        'SPDeletePaymentType', 
        [{ name: 'IDPaymentType', type: Int, value: IDPaymentType }], 
        201, 
        "Payment Type removed successfully", 
        "Payment Type not removed");
};

export default {
    CreatePaymentType,
    ReadAllPaymentTypes,
    ReadPaymentTypeByID,
    UpdatePaymentType,
    DeletePaymentType,
};