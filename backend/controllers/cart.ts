import sql from 'mssql';
import { executeProcedure, getItem } from './executeProcedure';
import { Request, Response } from 'express';

async function CreateCart(req: Request, res: Response) {
    const { IDClient, IDProduct, Quantity } = req.body;

    if (!IDClient || !IDProduct || !Quantity) {
        return res.status(400).send("Missing required fields");
    }

    const store = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (!store || store.recordset.length === 0) { return res.status(404).send("Client not found"); }

    const product = await getItem(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }]
    );
    if (!product || product.recordset.length === 0  ) { return res.status(404).send("Product not found"); }

    await executeProcedure(res,
        'CreateCart',
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'Quantity', type: sql.Int, value: Quantity }
        ],
        201,
        "Cart created successfully",
        "Cart not created");
}

async function RealAllCarts(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllCarts',
        [],
        200,
        "Carts retrieved successfully",
        "Carts not retrieved");
};

async function ReadCartByIDClientAndIDProduct(req: Request, res: Response) {
    const IDClient = req.params.IDClient;
    const IDProduct = req.params.IDProduct;

    await executeProcedure(res,
        'ReadCartByClientAndProduct',
        [{ name: 'IDClient', type: sql.Int, value: IDClient },
         { name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Cart retrieved successfully",
        "Cart not retrieved");
};

async function ReadCartByIDClient(req: Request, res: Response) {
    const IDClient = req.params.IDClient;

    await executeProcedure(res,
        'ReadCartByClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }],
        200,
        "Cart retrieved successfully",
        "Cart not retrieved");
};

async function UpdateCart(req: Request, res: Response) {
    const IDClient = req.params.IDClient;
    const IDProduct = req.params.IDProduct;

    const cart = await getItem(res,
        'ReadCartByClientAndProduct',
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDProduct', type: sql.Int, value: IDProduct }
        ]);
    if (!cart || cart.recordset.length === 0  ) { return res.status(404).send("Cart not found"); }

    const Quantity = req.body.Quantity || cart?.recordset[0].Quantity;  

    await executeProcedure(res,
        'UpdateCart',
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'Quantity', type: sql.Int, value: Quantity }
        ],
        200,
        "Cart updated successfully",
        "Cart not updated");
};

async function DeleteCart(req: Request, res: Response) {
    const IDClient = req.params.IDClient;
    const IDProduct = req.params.IDProduct;

    await executeProcedure(res,
        'DeleteCart',
        [{ name: 'IDClient', type: sql.Int, value: IDClient },
         { name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Cart deleted successfully",
        "Cart not deleted");
};

export default {
    CreateCart,
    RealAllCarts,
    ReadCartByIDClientAndIDProduct,
    ReadCartByIDClient,
    UpdateCart,
    DeleteCart
};