import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllProductTypes(req: Request, res: Response) {
    await executeProcedure(res,
        'GetAllProductTypes',
        [],
        200,
        "Product types retrieved successfully",
        "Product types not retrieved");
}

async function ProductTypeById(req: Request, res: Response) {
    const IDProductType = req.params.id;
    await executeProcedure(res,
        'GetProductTypeById',
        [{ name: 'IDProductType', type: sql.Int, value: IDProductType }],
        200,
        "Product type retrieved successfully",
        "Product type not retrieved");
}

async function CreateProductType(req: Request, res: Response) {
    const { Name } = req.body;
    //validate the json
    if (!Name) {
        return res.status(400).send("Missing required fields");
    }

    await executeProcedure(res,
        'CreateProductType',
        [{ name: 'Name', type: sql.NVarChar, value: Name }],
        201,
        "Product type created successfully",
        "Product type not created");
}

async function UpdateProductType(req: Request, res: Response) {
    const IDProductType = req.params.id;
    const { Name } = req.body;
    //validate the json
    if (!IDProductType || !Name) {
        return res.status(400).send("Missing required fields");
    }

    await executeProcedure(res,
        'UpdateProductType',
        [{ name: 'IDProductType', type: sql.Int, value: IDProductType },
        { name: 'Name', type: sql.NVarChar, value: Name }],
        200,
        "Product type updated successfully",
        "Product type not updated");
};

async function DeleteProductType(req: Request, res: Response) {
    const IDProductType = req.params.id;
    await executeProcedure(res,
        'DeleteProductType',
        [{ name: 'IDProductType', type: sql.Int, value: IDProductType }],
        200,
        "Product type deleted successfully",
        "Product type not deleted");
};

export default {
    AllProductTypes,
    ProductTypeById,
    CreateProductType,
    UpdateProductType,
    DeleteProductType
}