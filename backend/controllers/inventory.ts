import sql from 'mssql';
import { executeProcedure, getObject } from './executeProcedure';
import { Request, Response } from 'express';

async function AllInventories(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllInventories',
        [],
        200,
        "Inventories retrieved successfully",
        "Inventories not retrieved");
};

async function InventoryById(req: Request, res: Response) {
    const IDStore = req.params.IDStore;
    const IDProduct = req.params.IDProduct;
    await executeProcedure(res,
        'ReadInventoryByProductAndStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore },
         { name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Inventory retrieved successfully",
        "Inventory not retrieved");
};

async function ReadInventoryByIDProduct(req: Request, res: Response) {
    const IDProduct = req.params.IDProduct;
    await executeProcedure(res,
        'ReadInventoryByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Inventory retrieved successfully",
        "Inventory not retrieved");
}

async function CreateInventory(req: Request, res: Response) {
    const { IDProduct, IDStore, Quantity } = req.body;
    //validate the json
    if (!IDProduct || !IDStore || !Quantity) {
        return res.status(400).send("Missing required fields");
    }
    
    //validate idProduct
    const product = await getObject(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product retrieved successfully",
        "Product not retrieved");
    if (!product || product.recordset.length === 0  ) { return res.status(404).send("Product not found"); }

    //validate idStore
    const store = await getObject(res,
        'ReadByIDStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore }],
        200,
        "Store retrieved successfully",
        "Store not retrieved");
    if (!store || store.recordset.length === 0) { return res.status(404).send("Store not found"); }

    await executeProcedure(res,
        'CreateInventory',
        [
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'IDStore', type: sql.Int, value: IDStore },
            { name: 'Quantity', type: sql.Int, value: Quantity }
        ],
        201,
        "Inventory created successfully",
        "Inventory not created");
}

async function DeleteInventory(req: Request, res: Response) {
    const IDProduct = req.params.IDProduct;
    const IDStore = req.params.IDStore;
    await executeProcedure(res,
        'DeleteInventory',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct },
         { name: 'IDStore', type: sql.Int, value: IDStore }],
        200,
        "Inventory deleted successfully",
        "Inventory not deleted");
};

async function UpdateInventory(req: Request, res: Response) {
    const IDProduct = req.params.IDProduct;
    const IDStore = req.params.IDStore;
    const { Quantity } = req.body;
    //validate the json
    if (!Quantity) {
        return res.status(400).send("Missing required fields");
    }

    //Update the inventory
    await executeProcedure(res,
        'UpdateInventory',
        [
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'IDStore', type: sql.Int, value: IDStore },
            { name: 'Quantity', type: sql.Int, value: Quantity }
        ],
        200,
        "Inventory updated successfully",
        "Inventory not updated");
};

export default {
    AllInventories,
    InventoryById,
    CreateInventory,
    DeleteInventory,
    UpdateInventory, 
    ReadInventoryByIDProduct
};