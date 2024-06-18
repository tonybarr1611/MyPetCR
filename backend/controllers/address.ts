import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreateAddress(req: Request, res: Response) {
    const { IDClient, Province, City, District, ZIPCode, Description } = req.body;

    if (!IDClient || !Province || !City || !District || !ZIPCode || !Description) {
        return res.status(400).send("Missing required fields");
    }

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Address not created: client not found"); }

    await executeProcedure(res, 
        'CreateAddress', 
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'Province', type: sql.NVarChar(16), value: Province },
            { name: 'City', type: sql.NVarChar(64), value: City },
            { name: 'District', type: sql.NVarChar(64), value: District },
            { name: 'ZIPCode', type: sql.NVarChar(10), value: ZIPCode },
            { name: 'Description', type: sql.NVarChar(512), value: Description },
        ], 
        201, 
        "Address created successfully", 
        "Address not created");
};

async function ReadAllAddresses(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllAddresses', 
        [], 
        200, 
        "", 
        "Addresses not retrieved");
};

async function ReadAddressByID(req: Request, res: Response) {
    const IDClient = req.params.id;

    await executeProcedure(res, 
        'ReadByIDAddress', 
        [{ name: 'IDClient', type: sql.Int, value: IDClient }], 
        200, 
        "", 
        "Address not retrieved");
};

async function UpdateAddress(req: Request, res: Response) {
    const IDAddress = req.params.id;

    const address = await getItem(res,
        'ReadByIDAddress',
        [{ name: 'IDAddress', type: sql.Int, value: IDAddress }]
    );
    if (address?.recordset.length == 0) { return res.status(404).send("Address not found"); }

    const IDClient = req.body.IDClient || address?.recordset[0].IDClient;
    const Province = req.body.Province || address?.recordset[0].Province;
    const City = req.body.City || address?.recordset[0].City;
    const District = req.body.District || address?.recordset[0].District;
    const ZIPCode = req.body.ZIPCode || address?.recordset[0].ZIPCode;
    const Description = req.body.Description || address?.recordset[0].Description;

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Address not updated: client not found"); }

    await executeProcedure(res, 
        'UpdateAddress', 
        [
            { name: 'IDAddress', type: sql.Int, value: IDAddress },
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'Province', type: sql.NVarChar(16), value: Province },
            { name: 'City', type: sql.NVarChar(64), value: City },
            { name: 'District', type: sql.NVarChar(64), value: District },
            { name: 'ZIPCode', type: sql.NVarChar(10), value: ZIPCode },
            { name: 'Description', type: sql.NVarChar(512), value: Description },
        ], 
        200, 
        "Address updated successfully", 
        "Address not updated");
};

async function DeleteAddress(req: Request, res: Response) {
    const IDAddress = req.params.id;

    await executeProcedure(res, 
        'DeleteAddress', 
        [{ name: 'IDAddress', type: sql.Int, value: IDAddress }], 
        201, 
        "Address removed successfully", 
        "Address not removed");
};

export default {
    CreateAddress,
    ReadAllAddresses,
    ReadAddressByID,
    UpdateAddress,
    DeleteAddress
}