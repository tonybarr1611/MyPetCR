import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreateAddress(req: Request, res: Response) {
    const { IDInvoice, IDAddress, IDStatus, TrackingID } = req.body;

    if (!IDInvoice || !IDAddress || !IDStatus|| !TrackingID) {
        return res.status(400).send("Missing required fields");
    }

    const invoice = await getItem(res,
        'ReadByIDInvoice',
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }]
    );
    if (invoice?.recordset.length == 0) { return res.status(404).send("Shipping not created: invoice not found"); }

    const address = await getItem(res,
        'ReadByIDAddress',
        [{ name: 'IDAddress', type: sql.Int, value: IDAddress }]
    );
    if (address?.recordset.length == 0) { return res.status(404).send("Shipping not created: address not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Shipping not created: status not found"); }

    await executeProcedure(res, 
        'CreateShipping', 
        [
            { name: 'IDInvoice', type: sql.Int, value: IDInvoice },
            { name: 'IDAddress', type: sql.Int, value: IDAddress },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'TrackingID', type: sql.NVarChar(128), value: TrackingID }
        ], 
        201, 
        "Shipping created successfully", 
        "Shipping not created");
};

async function ReadAllShippings(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllShippings', 
        [], 
        200, 
        "", 
        "Shippings not retrieved");
};

async function ReadShippingByID(req: Request, res: Response) {
    const IDShipping = req.params.id;

    await executeProcedure(res, 
        'ReadByIDShipping', 
        [{ name: 'IDShipping', type: sql.Int, value: IDShipping }], 
        200, 
        "", 
        "Shipping not retrieved");
};

async function UpdateShipping(req: Request, res: Response) {
    const IDShipping = req.params.id;

    const shipping = await getItem(res,
        'ReadByIDShipping',
        [{ name: 'IDShipping', type: sql.Int, value: IDShipping }]
    );
    if (shipping?.recordset.length == 0) { return res.status(404).send("Shipping not found"); }

    const IDInvoice = req.body.IDInvoice || shipping?.recordset[0].IDInvoice;
    const IDAddress = req.body.IDAddress || shipping?.recordset[0].IDAddress;
    const IDStatus = req.body.IDStatus || shipping?.recordset[0].IDStatus;
    const TrackingID = req.body.TrackingID || shipping?.recordset[0].TrackingID;

    const invoice = await getItem(res,
        'ReadByIDInvoice',
        [{ name: 'IDInvoice', type: sql.Int, value: IDInvoice }]
    );
    if (invoice?.recordset.length == 0) { return res.status(404).send("Shipping not updated: invoice not found"); }

    const address = await getItem(res,
        'ReadByIDAddress',
        [{ name: 'IDAddress', type: sql.Int, value: IDAddress }]
    );
    if (address?.recordset.length == 0) { return res.status(404).send("Shipping not updated: address not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Shipping not updated: status not found"); }

    await executeProcedure(res, 
        'UpdateShipping', 
        [
            { name: 'IDShipping', type: sql.Int, value: IDShipping },
            { name: 'IDInvoice', type: sql.Int, value: IDInvoice },
            { name: 'IDAddress', type: sql.Int, value: IDAddress },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'TrackingID', type: sql.NVarChar(128), value: TrackingID }
        ], 
        200,
        "Shipping updated successfully", 
        "Shipping not updated");
};

async function DeleteShipping(req: Request, res: Response) {
    const IDShipping = req.params.id;

    await executeProcedure(res, 
        'DeleteShipping', 
        [{ name: 'IDShipping', type: sql.Int, value: IDShipping }], 
        201, 
        "Shipping removed successfully", 
        "Shipping not removed");
};

export default {
    CreateAddress,
    ReadAllShippings,
    ReadShippingByID,
    UpdateShipping,
    DeleteShipping,
}