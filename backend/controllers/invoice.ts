import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreateInvoice(req: Request, res: Response) {
    const { IDAppointment, IDClient, IDPayment, IDStatus, DateTime } = req.body;

    if (!IDAppointment || !IDClient || !IDPayment|| !IDStatus || !DateTime) {
        return res.status(400).send("Missing required fields");
    }

    const appointment = await getItem(res,
        'ReadByIDAppointment',
        [{ name: 'IDAppointment', type: sql.Int, value: IDAppointment }]
    );
    if (appointment?.recordset.length == 0) { return res.status(404).send("Appointment not found"); }

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Client not found"); }

    const payment = await getItem(res,
        'ReadByIDPayment',
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }]
    );
    if (payment?.recordset.length == 0) { return res.status(404).send("Payment not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Status not found"); }    

    
    await executeProcedure(res, 
        'CreateInvoice', 
        [
            { name: 'IDAppointment', type: sql.Int, value: IDAppointment },
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDPayment', type: sql.Int, value: IDPayment },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'DateTime', type: sql.DateTime, value: DateTime }
        ], 
        201, 
        "Invoice created successfully", 
        "Invoice not created");
};

async function CreateInvoiceByCart(req: Request, res: Response) {
    const { IDClient, IDPayment, Shipping } = req.body;

    if (!IDClient || !IDPayment) {
        return res.status(400).send("Missing required fields");
    }

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Client not found"); }

    const payment = await getItem(res,
        'ReadByIDPayment',
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }]
    );
    if (payment?.recordset.length == 0) { return res.status(404).send("Payment not found"); }

    await executeProcedure(res, 
        'CreateInvoiceByCart', 
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDPayment', type: sql.Int, value: IDPayment },
            { name: 'Shipping', type: sql.NVarChar(5), value: Shipping  }
        ], 
        201, 
        "Invoice created successfully", 
        "Invoice not created");
};

async function ReadAllInvoices(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllInvoices', 
        [], 
        200, 
        "", 
        "Invoices not retrieved");
};

async function ReadInvoicesByID(req: Request, res: Response) {
    const IDInvoice = req.params.id;

    await executeProcedure(res, 
        'ReadByIDInvoice', 
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }], 
        200, 
        "", 
        "Invoice not retrieved");
};

async function ReadInvoicesByClient(req: Request, res: Response) {
    const IDClient = req.params.id;

    await executeProcedure(res, 
        'ReadInvoicesByIDClient', 
        [{ name: 'IDClient', type: sql.Int, value: IDClient }], 
        200, 
        "", 
        "Invoices not retrieved");
};

async function UpdateInvoice(req: Request, res: Response) {
    const IDInvoice = req.params.id;

    const invoice = await getItem(res,
        'ReadByIDInvoice',
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }]
    );
    if (invoice?.recordset.length == 0) { return res.status(404).send("Invoice not found"); }

    const IDAppointment = req.body.IDAppointment || invoice?.recordset[0].IDAppointment;
    const IDClient = req.body.IDClient || invoice?.recordset[0].IDClient;
    const IDPayment = req.body.IDPayment || invoice?.recordset[0].IDPayment;
    const IDStatus = req.body.IDStatus || invoice?.recordset[0].IDStatus;
    const DateTime = req.body.DateTime || invoice?.recordset[0].DateTime;

    const appointment = await getItem(res,
        'ReadByIDAppointment',
        [{ name: 'IDAppointment', type: sql.Int, value: IDAppointment }]
    );
    if (appointment?.recordset.length == 0) { return res.status(404).send("Invoice not updated: Appointment not found"); }

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Invoice not updated: Client not found"); }

    const payment = await getItem(res,
        'ReadByIDPayment',
        [{ name: 'IDPayment', type: sql.Int, value: IDPayment }]
    );
    if (payment?.recordset.length == 0) { return res.status(404).send("Invoice not updated: Payment not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Invoice not updated: Status not found"); }    

    await executeProcedure(res, 
        'UpdateInvoice', 
        [
            { name: 'IDInvoice', type: sql.Int, value: IDInvoice },
            { name: 'IDAppointment', type: sql.Int, value: IDAppointment },
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDPayment', type: sql.Int, value: IDPayment },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'DateTime', type: sql.DateTime, value: DateTime }
        ], 
        201,
        "Invoice updated successfully", 
        "Invoice not updated");
};

async function DeleteInvoice(req: Request, res: Response) {
    const IDInvoice = req.params.id;

    await executeProcedure(res, 
        'DeleteInvoice', 
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }], 
        201, 
        "Invoice removed successfully", 
        "Invoice not removed");
};

export default {
    CreateInvoice,
    CreateInvoiceByCart,
    ReadAllInvoices,
    ReadInvoicesByID,
    ReadInvoicesByClient,
    UpdateInvoice,
    DeleteInvoice,
}