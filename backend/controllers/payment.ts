import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreatePayment(req: Request, res: Response) {
    const { IDPaymentType, Name } = req.body;

    if (!IDPaymentType || !Name) {
        return res.status(400).send("Missing required fields");
    }

    const paymentType = await getItem(res,
        'ReadByIDPaymentType',
        [{ name: 'IDPaymentType', type: sql.Int, value: IDPaymentType }]
    );
    if (paymentType?.recordset.length == 0) { return res.status(404).send("Payment not created: Payment Type not found"); }

    await executeProcedure(res, 
        'CreatePayment', 
        [
            { name: 'IDPaymentType', type: sql.Int, value: IDPaymentType },
            { name: 'Name', type: sql.NVarChar(255), value: Name }
        ], 
        201, 
        "Payment created successfully", 
        "Payment not created");
};

async function ReadAllPayments(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllPayments', 
        [], 
        200, 
        "", 
        "Payments not retrieved");
};

async function ReadPaymentByID(req: Request, res: Response) {
    const IDPayment = req.params.id;
    await executeProcedure(res, 
        'ReadByIDPayment', 
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }], 
        200, 
        "", 
        "Payment not retrieved");
};

async function UpdatePayment(req: Request, res: Response) {
    const IDPayment = req.params.id;

    const payment = await getItem(res,
        'ReadByIDPayment',
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }]
    );
    if (payment?.recordset.length == 0) { return res.status(404).send("Payment not found"); }

    const Name = req.body.Name || payment?.recordset[0].Name;
    const IDPaymentType = req.body.IDPaymentType || payment?.recordset[0].IDPaymentType;

    const paymentType = await getItem(res,
        'ReadByIDPaymentType',
        [{ name: 'IDPaymentType', type: sql.Int, value: IDPaymentType }]
    );
    if (paymentType?.recordset.length == 0) { return res.status(404).send("Payment not updated: Payment Type not found"); }


    await executeProcedure(res, 
        'UpdatePayment', 
        [
            { name: 'IDPayment', type: sql.Int, value: IDPayment },
            { name: 'NewName', type: sql.NVarChar(255), value: Name }
        ], 
        201,
        "Payment updated successfully", 
        "Payment not updated");
};

async function DeletePayment(req: Request, res: Response) {
    const IDPayment = req.params.id;
    await executeProcedure(res, 
        'DeletePayment', 
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }], 
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