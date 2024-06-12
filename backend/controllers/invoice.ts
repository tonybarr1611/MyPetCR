import { Request, Response } from 'express';
import { Int, DateTime  } from 'mssql';

import { executeProcedure } from './executeProcedure';

async function CreateInvoice(req: Request, res: Response) {
    const { IDAppointment, IDClient, IDPayment, IDStatus, Date } = req.body;
    await executeProcedure(res, 
        'SPCreateInvoice', 
        [
            { name: 'IDAppointment', type: Int, value: IDAppointment },
            { name: 'IDClient', type: Int, value: IDClient },
            { name: 'IDPayment', type: Int, value: IDPayment },
            { name: 'IDStatus', type: Int, value: IDStatus },
            { name: 'DateTime', type: DateTime, value: Date }
        ], 
        201, 
        "Invoice created successfully", 
        "Invoice not created");
};

async function ReadAllInvoices(req: Request, res: Response) {
    await executeProcedure(res, 
        'SPReadAllInvoices', 
        [], 
        200, 
        "", 
        "Invoices not retrieved");
};

async function ReadInvoicesByID(req: Request, res: Response) {
    const IDInvoice = req.params.id;
    await executeProcedure(res, 
        'SPReadInvoiceByID', 
        [{ name: 'IDInvoice', type: Int, value: IDInvoice }], 
        200, 
        "", 
        "Invoice not retrieved");
};

async function UpdateInvoice(req: Request, res: Response) {
    const IDInvoice = req.params.id;
    const { IDAppointment, IDClient, IDPayment, IDStatus, Date } = req.body;
    await executeProcedure(res, 
        'SPUpdateInvoice', 
        [
            { name: 'IDInvoice', type: Int, value: IDInvoice },
            { name: 'IDAppointment', type: Int, value: IDAppointment },
            { name: 'IDClient', type: Int, value: IDClient },
            { name: 'IDPayment', type: Int, value: IDPayment },
            { name: 'IDStatus', type: Int, value: IDStatus },
            { name: 'DateTime', type: DateTime, value: Date }
        ], 
        201,
        "Invoice updated successfully", 
        "Invoice not updated");
};

async function DeleteInvoice(req: Request, res: Response) {
    const IDInvoice = req.params.id;
    await executeProcedure(res, 
        'SPDeleteInvoice', 
        [{ name: 'IDInvoice', type: Int, value: IDInvoice }], 
        201, 
        "Invoice removed successfully", 
        "Invoice not removed");
};

export default {
    CreateInvoice,
    ReadAllInvoices,
    ReadInvoicesByID,
    UpdateInvoice,
    DeleteInvoice,
}