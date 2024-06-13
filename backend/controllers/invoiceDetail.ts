import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getItem } from './executeProcedure';

async function CreateInvoiceDetail(req: Request, res: Response) {
    const { IDInvoice, IDProduct, Description, Quantity, Price } = req.body;
    if (!IDInvoice || !IDProduct || !Description|| !Quantity || !Price) {
        return res.status(400).send("Missing required fields");
    }

    //validate IDInvoice
    const invoice = await getItem(res,
        'SPReadInvoiceByID',
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }]
    );
    if (invoice?.recordset.length == 0) { return res.status(404).send("Invoice Detail not created: Invoice not found"); }

    //validate IDProduct
    const product = await getItem(res,
        'GetProductById',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }]
    );
    if (product?.recordset.length == 0) { return res.status(404).send("Invoice Detail not created: Product not found"); }

    await executeProcedure(res,
        'SPCreateInvoiceDetail',
        [
            { name: 'IDInvoice', type: sql.Int, value: IDInvoice },
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'Description', type: sql.NVarChar(255), value: Description },
            { name: 'Quantity', type: sql.Int, value: Quantity },
            { name: 'Price', type: sql.Money, value: Price }
        ],
        201,
        "Invoice detail created successfully",
        "Invoice detail not created");
}

async function ReadAllInvoiceDetails(req: Request, res: Response) {
    await executeProcedure(res,
        'SPReadAllInvoiceDetails',
        [],
        200,
        "Invoice details retrieved successfully",
        "Invoice details not retrieved");
}

async function ReadInvoiceDetailById(req: Request, res: Response) {
    const IDInvoiceDetail = req.params.id;
    await executeProcedure(res,
        'SPReadInvoiceDetailByID',
        [{ name: 'IDInvoiceDetail', type: sql.Int, value: IDInvoiceDetail }],
        200,
        "Invoice detail retrieved successfully",
        "Invoice detail not retrieved");
}

async function UpdateInvoiceDetail(req: Request, res: Response) {
    const IDInvoiceDetail = req.params.id;

    //validate IDProduct
    const invoiceDetail = await getItem(res,
            'SPReadInvoiceDetailByID',
            [{ name: 'IDInvoiceDetail', type: sql.Int, value: IDInvoiceDetail }]
    );
    if (invoiceDetail?.recordset.length == 0) { return res.status(404).send("Invoice detail not found"); }

    const IDInvoice = req.body.IDInvoice || invoiceDetail?.recordset[0].IDInvoice;
    const IDProduct = req.body.IDProduct || invoiceDetail?.recordset[0].IDProduct;
    const Description = req.body.Description || invoiceDetail?.recordset[0].Description;
    const Quantity = req.body.Quantity || invoiceDetail?.recordset[0].Quantity;
    const Price = req.body.Price || invoiceDetail?.recordset[0].Price;

    console.log(invoiceDetail?.recordset[0]);
    
    
    //validate IDInvoice
    const invoice = await getItem(res,
        'SPReadInvoiceByID',
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }]
    );
    if (invoice?.recordset.length == 0) { return res.status(404).send("Invoice Detail not updated: Invoice not found"); }

    //validate IDProduct
    const product = await getItem(res,
        'GetProductById',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }]
    );
    if (product?.recordset.length == 0) { return res.status(404).send("Invoice Detail not updated: Product not found"); }
    
    await executeProcedure(res,
        'SPUpdateInvoiceDetail',
        [
            { name: 'IDInvoiceDetail', type: sql.Int, value: IDInvoiceDetail },
            { name: 'IDInvoice', type: sql.Int, value: IDInvoice },
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'Description', type: sql.NVarChar(255), value: Description },
            { name: 'Quantity', type: sql.Int, value: Quantity },
            { name: 'Price', type: sql.Decimal, value: Price }
        ],
        200,
        "Invoice detail updated successfully",
        "Invoice detail not updated");
}

async function DeleteInvoiceDetail(req: Request, res: Response) {
    const IDInvoiceDetail = req.params.id;

    //validate IDProduct
    const invoiceDetail = await getItem(res,
        'SPReadInvoiceDetailByID',
        [{ name: 'IDInvoiceDetail', type: sql.Int, value: IDInvoiceDetail }]
    );
    if (invoiceDetail?.recordset.length == 0) { return res.status(404).send("Invoice Detail not deleted: Invoice detail not found"); }

    await executeProcedure(res,
        'SPDeleteInvoiceDetail',
        [{ name: 'IDInvoiceDetail', type: sql.Int, value: IDInvoiceDetail }],
        200,
        "Invoice detail deleted successfully",
        "Invoice detail not deleted");
}

export default {
    CreateInvoiceDetail,
    ReadAllInvoiceDetails,
    ReadInvoiceDetailById,
    UpdateInvoiceDetail,
    DeleteInvoiceDetail
}
