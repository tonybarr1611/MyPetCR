import { Request, Response } from 'express';
import { Int, NVarChar } from 'mssql';

import { executeProcedure } from './executeProcedure';

async function CreatePayment(req: Request, res: Response) {
    const { IDPaymentType, Name } = req.body;
    await executeProcedure(res, 
        'SPCreatePayment', 
        [
            { name: 'IDPaymentType', type: Int, value: IDPaymentType },
            { name: 'Name', type: NVarChar(255), value: Name }
        ], 
        201, 
        "Payment created successfully", 
        "Payment not created");
};

async function ReadAllPayments(req: Request, res: Response) {
    await executeProcedure(res, 
        'SPReadAllPayment', 
        [], 
        200, 
        "", 
        "Payments not retrieved");
};

async function ReadPaymentByID(req: Request, res: Response) {
    const IDPayment = req.params.id;
    await executeProcedure(res, 
        'SPReadPaymentByID', 
        [{ name: 'IDPayment', type: Int, value: IDPayment }], 
        200, 
        "", 
        "Payment not retrieved");
};

async function UpdatePayment(req: Request, res: Response) {
    const IDPayment = req.params.id;
    const { Name } = req.body;
    await executeProcedure(res, 
        'SPUpdatePayment', 
        [
            { name: 'IDPayment', type: Int, value: IDPayment },
            { name: 'NewName', type: NVarChar(255), value: Name }
        ], 
        201,
        "Payment updated successfully", 
        "Payment not updated");
};

async function DeletePayment(req: Request, res: Response) {
    const IDPayment = req.params.id;
    await executeProcedure(res, 
        'SPDeletePayment', 
        [{ name: 'IDPayment', type: Int, value: IDPayment }], 
        201, 
        "Payment removed successfully", 
        "Payment not removed");
};

export default {
    CreatePayment,
    ReadAllPayments,
    ReadPaymentByID,
    UpdatePayment,
    DeletePayment,
}