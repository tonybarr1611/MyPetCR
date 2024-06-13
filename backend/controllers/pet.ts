import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getItem } from './executeProcedure';

async function CreatePet(req: Request, res: Response) {
    const { IDBreed, IDClient, Name, Birthdate, Weight, Notes } = req.body;
    if (!IDBreed || !IDClient || !Name|| !Birthdate || !Weight || !Notes) {
        return res.status(400).send("Missing required fields");
    }

    const breed = await getItem(res,
        'ReadByIDBreed',
        [{ name: 'IDBreed', type: sql.Int, value: IDBreed }]
    );
    if (breed?.recordset.length == 0) { return res.status(404).send("Pet not created: Breed not found"); }

    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Pet not created: Client not found"); }

    await executeProcedure(res,
        'CreatePet',
        [
            { name: 'IDBreed', type: sql.Int, value: IDBreed },
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'Birthdate', type: sql.DateTime, value: Birthdate },
            { name: 'Weight', type: sql.Int, value: Weight },
            { name: 'Notes', type: sql.NVarChar(512), value: Notes },
        ],
        201,
        "Pet created successfully",
        "Pet not created");
}

async function ReadAllPets(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllPets',
        [],
        200,
        "Pets retrieved successfully",
        "Pets not retrieved");
}

async function ReadPetById(req: Request, res: Response) {
    const IDPet = req.params.id;
    await executeProcedure(res,
        'ReadByIDPet',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }],
        200,
        "Pet retrieved successfully",
        "Pet not retrieved");
}

async function UpdatePet(req: Request, res: Response) {
    const IDPet = req.params.id;

    //validate IDProduct
    const pet = await getItem(res,
            'ReadByIDPet',
            [{ name: 'IDPet', type: sql.Int, value: IDPet }]
    );
    if (pet?.recordset.length == 0) { return res.status(404).send("Pet detail not found"); }

    const IDBreed = req.body.IDBreed || pet?.recordset[0].IDBreed;
    const IDClient = req.body.IDClient || pet?.recordset[0].IDClient;
    const Name = req.body.Name || pet?.recordset[0].Name;
    const Birthdate = req.body.Birthdate || pet?.recordset[0].Birthdate;
    const Weight = req.body.Weight || pet?.recordset[0].Weight;   
    const Notes = req.body.Notes || pet?.recordset[0].Notes;    
    
    const breed = await getItem(res,
        'ReadByIDBreed',
        [{ name: 'IDBreed', type: sql.Int, value: IDBreed }]
    );
    if (breed?.recordset.length == 0) { return res.status(404).send("Pet not updated: Breed not found"); }
    
    const client = await getItem(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type: sql.Int, value: IDClient }]
    );
    if (client?.recordset.length == 0) { return res.status(404).send("Pet not updated: Client not found"); }

    await executeProcedure(res,
        'UpdatePet',
        [
            { name: 'IDPet', type: sql.Int, value: IDPet },
            { name: 'IDBreed', type: sql.Int, value: IDBreed },
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'Birthdate', type: sql.NVarChar(255), value: Birthdate },
            { name: 'Weight', type: sql.Int, value: Weight },
            { name: 'Notes', type: sql.NVarChar(512), value: Notes }
        ],
        200,
        "Pet updated successfully",
        "Pet not updated");
}

async function DeletePet(req: Request, res: Response) {
    const IDPet = req.params.id;

    await executeProcedure(res,
        'DeletePet',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }],
        200,
        "Pet deleted successfully",
        "Pet not deleted");
}

export default {
    CreatePet,
    ReadAllPets,
    ReadPetById,
    UpdatePet,
    DeletePet
}
