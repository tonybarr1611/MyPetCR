import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getItem } from './executeProcedure';

async function CreateBreed(req: Request, res: Response) {
    const { IDPetType, Name } = req.body;
    if (!IDPetType || !Name) {
        return res.status(400).send("Missing required fields");
    }

    const petType = await getItem(res,
        'ReadByIDPetType',
        [{ name: 'IDPetType', type: sql.Int, value: IDPetType }]
    );
    if (petType?.recordset.length == 0) { return res.status(404).send("Breed not created: Pet type not found"); }

    await executeProcedure(res,
        'CreateBreed',
        [
            { name: 'IDPetType', type: sql.Int, value: IDPetType },
            { name: 'Name', type: sql.NVarChar(128), value: Name },
        ],
        201,
        "Breed created successfully",
        "Breed not created");
}

async function ReadAllBreeds(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllBreeds',
        [],
        200,
        "Breeds retrieved successfully",
        "Breeds not retrieved");
}

async function ReadBreedById(req: Request, res: Response) {
    const IDBreed = req.params.id;
    await executeProcedure(res,
        'ReadByIDBreed',
        [{ name: 'IDBreed', type: sql.Int, value: IDBreed }],
        200,
        "Breed retrieved successfully",
        "Breed not retrieved");
}

async function UpdateBreed(req: Request, res: Response) {
    const IDBreed = req.params.id;

    const breed = await getItem(res,
        'ReadByIDBreed',
        [{ name: 'IDBreed', type: sql.Int, value: IDBreed }]
    );
    if (breed?.recordset.length == 0) { return res.status(404).send("Breed not found"); }

    const IDPetType = req.body.IDPetType || breed?.recordset[0].IDPetType;
    const Name = req.body.Name || breed?.recordset[0].Name;
    
    const petType = await getItem(res,
        'ReadByIDPetType',
        [{ name: 'IDPetType', type: sql.Int, value: IDPetType }]
    );
    if (petType?.recordset.length == 0) { return res.status(404).send("Breed not updated: Pet type not found"); }
    
    await executeProcedure(res,
        'UpdateBreed',
        [
            { name: 'IDBreed', type: sql.Int, value: IDBreed },
            { name: 'IDPetType', type: sql.Int, value: IDPetType },
            { name: 'Name', type: sql.NVarChar(128), value: Name },
        ],
        200,
        "Breed updated successfully",
        "Breed not updated");
}

async function DeleteBreed(req: Request, res: Response) {
    const IDPet = req.params.id;

    await executeProcedure(res,
        'DeleteBreed',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }],
        200,
        "Breed deleted successfully",
        "Breed not deleted");
}

export default {
    CreateBreed,
    ReadAllBreeds,
    ReadBreedById,
    UpdateBreed,
    DeleteBreed
}
