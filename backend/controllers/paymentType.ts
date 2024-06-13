import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreatePaymentType(req: Request, res: Response) {
    const { Name } = req.body;

    if (!Name) {
        return res.status(400).send("Name is required");
    }

    await executeProcedure(res, 
        'CreatePaymentType', 
        [{ name: 'Name', type: sql.NVarChar(255), value: Name }], 
        201, 
        "Payment type created successfully", 
        "Payment type not created");
};

async function ReadAllPaymentTypes(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllPaymentTypes', 
        [], 
        200, 
        "Payment Types retrieved successfully", 
        "Payment Types not retrieved");
};

async function ReadPaymentTypeByID(req: Request, res: Response) {
    const IDPaymentType = req.params.id;
    await executeProcedure(res, 
        'ReadByIDPaymentType', 
        [{ name: 'IDPaymentType', type: sql.Int, value: IDPaymentType }], 
        200, 
        "Payment type retrieved successfully", 
        "Payment type not retrieved");
};

async function UpdatePaymentType(req: Request, res: Response) {
    const IDPaymentType = req.params.id;

    const paymentType = await getItem(res,
        'ReadByIDPaymentType',
        [{ name: 'IDPaymentType', type: sql.Int, value: IDPaymentType }]
    );
    if (paymentType?.recordset.length == 0) { return res.status(404).send("Payment type not found"); }

    const Name = req.body.Name || paymentType?.recordset[0].Name;

    await executeProcedure(res, 
        'UpdatePaymentType', 
        [
            { name: 'IDPaymentType', type: sql.Int, value: IDPaymentType },
            { name: 'NewName', type: sql.NVarChar(255), value: Name }
        ], 
        201,
        "Payment type updated successfully", 
        "Payment type not updated");
};

async function DeletePaymentType(req: Request, res: Response) {
    const IDPaymentType = req.params.id;
    await executeProcedure(res, 
        'DeletePaymentType', 
        [{ name: 'IDPaymentType', type: sql.Int, value: IDPaymentType }], 
        200, 
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