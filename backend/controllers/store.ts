import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllStores(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllStores',
        [],
        200,
        "Stores retrieved successfully",
        "Stores not retrieved");
}

async function StoreById(req: Request, res: Response) {
    const IDStore = req.params.id;
    await executeProcedure(res,
        'ReadByIDStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore }],
        200,
        "Store retrieved successfully",
        "Store not retrieved");
};

async function CreateStore(req: Request, res: Response) {
    const {Location} = req.body;
    //validate the json
    if (!Location) 
        { return res.status(400).send("Missing required fields");}
    await executeProcedure(res,
        'CreateStore',
        [{ name: 'Location', type: sql.NVarChar(128), value: Location }],
        201,
        "Store created successfully",
        "Store not created");

};

async function UpdateStore(req: Request, res: Response) {
    const IDStore = req.params.id;
    const {Location} = req.body;

    //validate the json
    if ( !Location) 
        { return res.status(400).send("Missing required fields");}

    await executeProcedure(res,
        'UpdateStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore },
        { name: 'Location', type: sql.NVarChar(128), value: Location }],
        200,
        "Store updated successfully",
        "Store not updated");
};

async function DeleteStore(req: Request, res: Response) {
    const IDStore = req.params.id;
    await executeProcedure(res,
        'DeleteStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore }],
        200,
        "Store deleted successfully",
        "Store not deleted");
}

export default {
    AllStores,
    StoreById,
    CreateStore,
    UpdateStore,
    DeleteStore
};