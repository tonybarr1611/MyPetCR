import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllReviews(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllReviews',
        [],
        200,
        "Reviews retrieved successfully",
        "Reviews not retrieved");
}

async function ReviewById(req: Request, res: Response) {
    const IDReview = req.params.id;
    await executeProcedure(res,
        'ReadByIDReview',
        [{ name: 'IDReview', type: sql.Int, value: IDReview }],
        200,
        "Review retrieved successfully",
        "Review not retrieved");
}

async function CreateReview(req: Request, res: Response) {
    const { IDProduct, IDClient, Description, Rating, DateTime  } = req.body;
    //validate the json
    if (!IDProduct || !IDClient || !Description || !Rating || !DateTime) {
        return res.status(400).send("Missing required fields");}

    //validate idProduct
    const product = await getObject(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product retrieved successfully",
        "Product not retrieved");
    if (!product || product.recordset.length === 0) { return res.status(404).send("Product not found");}

    //validate idClient
    const client = await getObject(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }],
        200,
        "Client retrieved successfully",
        "Client not retrieved");
    if (!client || client.recordset.length === 0) { return res.status(404).send("Client not found");}

    await executeProcedure(res,
        'CreateReview',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct },
         { name: 'IDClient', type: sql.Int, value: IDClient },
         { name: 'Description', type: sql.NVarChar(512), value: Description },
         { name: 'Rating', type: sql.TinyInt, value: Rating },
         { name: 'DateTime', type: sql.DateTime, value: DateTime }],
        201,
        "Review created successfully",
        "Review not created");
};

async function UpdateReview(req: Request, res: Response) {
    const IDReview = req.params.id;
    let { IDProduct, IDClient, Description, Rating, DateTime  } = req.body;
    
    //search for the review
    const review = await getObject(res,
        'ReadByIDReview',
        [{ name: 'IDReview', type: sql.Int, value: IDReview }],
        200,
        "Review retrieved successfully",
        "Review not retrieved");
    if (!review || review.recordset.length === 0) {return res.status(404).send("Not review found");}

    //validate the json
    IDProduct = IDProduct || review.recordset[0].IDProduct;
    IDClient = IDClient || review.recordset[0].IDClient;
    Description = Description || review.recordset[0].Description;
    Rating = Rating || review.recordset[0].Rating;
    DateTime = DateTime || review.recordset[0].DateTime;

    //validate idProduct
    const product = await getObject(res,
        'ReadByIDProduct',
        [{ name: 'IDProduct', type: sql.Int, value: IDProduct }],
        200,
        "Product retrieved successfully",
        "Product not retrieved");
    if (!product || product.recordset.length === 0) { return res.status(404).send("Product not found");}

    //validate idClient
    const client = await getObject(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }],
        200,
        "Client retrieved successfully",
        "Client not retrieved");
    if (!client || client.recordset.length === 0) { return res.status(404).send("Client not found");}
    
    //validate rating
    if (Rating < 0 || Rating > 5) { return res.status(400).send("Rating must be between 0 and 5");}

    //update the review
    await executeProcedure(res,
        'UpdateReview',
        [{ name: 'IDReview', type: sql.Int, value: IDReview },
         { name: 'IDProduct', type: sql.Int, value: IDProduct },
         { name: 'IDClient', type: sql.Int, value: IDClient },
         { name: 'Description', type: sql.NVarChar(512), value: Description },
         { name: 'Rating', type: sql.TinyInt, value: Rating },
         { name: 'DateTime', type: sql.DateTime, value: DateTime }],
        200,
        "Review updated successfully",
        "Review not updated");
};

async function DeleteReview(req: Request, res: Response) {
    const IDReview = req.params.id;
    await executeProcedure(res,
        'DeleteReview',
        [{ name: 'IDReview', type: sql.Int, value: IDReview }],
        200,
        "Review deleted successfully",
        "Review not deleted");
}

export default {
    AllReviews,
    ReviewById,
    CreateReview,
    UpdateReview,
    DeleteReview
};