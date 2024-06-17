import { Request, Response } from 'express';
import sql from 'mssql';
import { executeProcedure, getObject } from './executeProcedure';


async function AllProducts(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllProducts',
        [],
        200,
        "Products retrieved successfully",
        "Products not retrieved");
};

async function ProductById(req: Request, res: Response) {
    const IDProduct = req.params.id;
    await executeProcedure(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product retrieved successfully",
        "Product not retrieved");
};

async function CreateProduct(req: Request, res: Response) {
    const { Name, IDProductType, Description, Price } = req.body;
    // validate the json
    if (!Name || !IDProductType || !Description || !Price) {
        return res.status(400).send("Missing required fields");
    }

    // validate idProductType
    const productType = await getObject(res,
        'ReadByIDProductType',
        [{ name: 'IDProductType', type: sql.Int, value: IDProductType }],
        200,
        "Product type retrieved successfully",
        "Product type not retrieved");
    if (!productType || productType.recordset.length === 0) { return res.status(404).send("Product type not found"); }

    await executeProcedure(res,
        'CreateProduct',
        [
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'IDProductType', type: sql.Int, value: IDProductType },
            { name: 'Description', type: sql.NVarChar(512), value: Description },
            { name: 'Price', type: sql.Money, value: Price }
        ],
        201,
        "Product created successfully",
        "Product not created");
};

async function UpdateProduct(req: Request, res: Response) {
    const IDProduct = req.params.id;
    let { Name, IDProductType, Description, Price } = req.body;

    // search for the product
    const product = await getObject(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product retrieved successfully",
        "Product not retrieved");
    if (!product || product.recordset.length === 0) { return res.status(404).send("Product not found"); }

    // validate the json
    Name = Name || product.recordset[0].Name;
    IDProductType = IDProductType || product.recordset[0].IDProductType;
    Description = Description || product.recordset[0].Description;
    Price = Price || product.recordset[0].Price;

    // validate idProductType
    const productType = await getObject(res,
        'ReadByIDProductType',
        [{ name: 'IDProductType', type: sql.Int, value: IDProductType }],
        200,
        "Product type retrieved successfully",
        "Product type not retrieved");
    if (!productType || productType.recordset.length === 0) { return res.status(404).send("Product type not found"); }

    // update the product
    await executeProcedure(res,
        'UpdateProduct',
        [
            { name: 'IDProduct', type: sql.Int, value: IDProduct },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'IDProductType', type: sql.Int, value: IDProductType },
            { name: 'Description', type: sql.NVarChar(512), value: Description },
            { name: 'Price', type: sql.Money, value: Price }
        ],
        200,
        "Product updated successfully",
        "Product not updated");
}; 

async function DeleteProduct(req: Request, res: Response) {
    const IDProduct = req.params.id;
    await executeProcedure(res,
        'DeleteProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product deleted successfully",
        "Product not deleted");
};

async function ReadMedicineOrServiceProducts (req: Request, res: Response) {
    await executeProcedure(res,
        'ReadMedicineOrServiceProducts',
        [],
        200,
        "Medicine or service products retrieved successfully",
        "Medicine or service products not retrieved");
};

export default {
    AllProducts,
    ProductById,
    UpdateProduct,
    DeleteProduct,
    CreateProduct,
    ReadMedicineOrServiceProducts
};