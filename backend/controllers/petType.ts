import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getItem } from './executeProcedure';

async function CreatePetType(req: Request, res: Response) {
    const Name = req.body.Name;
    if (!Name) {
        return res.status(400).send("Missing require Name");
    }

    await executeProcedure(res,
        'CreatePetType',
        [
            { name: 'Name', type: sql.NVarChar(255), value: Name },
        ],
        201,
        "Pet Type created successfully",
        "Pet Type not created");
}

async function ReadAllPetTypes(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllPetTypes',
        [],
        200,
        "Pet types retrieved successfully",
        "Pet types details not retrieved");
}

async function ReadPetTypeById(req: Request, res: Response) {
    const IDPetType = req.params.id;
    await executeProcedure(res,
        'ReadByIDPetType',
        [{ name: 'IDPetType', type: sql.Int, value: IDPetType }],
        200,
        "Pet type retrieved successfully",
        "Pet type do not exist");
}

async function UpdatePetType(req: Request, res: Response) {
    const IDPetType = req.params.id;
    const Name = req.body.Name;
    
    await executeProcedure(res,
        'UpdatePetType',
        [
            { name: 'IDPetType', type: sql.Int, value: IDPetType },
            { name: 'NewName', type: sql.NVarChar(255), value: Name },
        ],
        200,
        "Pet type updated successfully",
        "Pet type not updated");
}

async function DeletePetType(req: Request, res: Response) {
    const IDPetType = req.params.id;

    //validate IDProduct
    const petType = await getItem(res,
        'ReadByIDPetType',
        [{ name: 'IDPetType', type: sql.Int, value: IDPetType }]
    );
    if (petType?.recordset.length == 0) { return res.status(404).send("Pet type not found"); }

    await executeProcedure(res,
        'DeletePetType',
        [{ name: 'IDPetType', type: sql.Int, value: IDPetType }],
        200,
        "Pet type deleted successfully",
        "Pet type detail not deleted");
}

export default {
    CreatePetType,
    ReadAllPetTypes,
    ReadPetTypeById,
    UpdatePetType,
    DeletePetType
}
