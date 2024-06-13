import sql from 'mssql';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllUserTypes(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllUserTypes',
        [],
        200,
        "User types retrieved successfully",
        "User types not retrieved");
}

async function UserTypeById(req: Request, res: Response) {
    const IDUserType = req.params.id;
    await executeProcedure(res,
        'ReadByIDUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User type retrieved successfully",
        "User type not retrieved");
}

async function CreateUserType(req: Request, res: Response) {
    const { Name, Clearance } = req.body;
    //validate the json
    if (!Name || !Clearance) {
        return res.status(400).send("Missing required fields");
    }

    //create the user type
    await executeProcedure(res,
        'CreateUserType',
        [{ name: 'Name', type: sql.NVarChar, value: Name },
        { name: 'Clearance', type: sql.Int, value: Clearance }],
        201,
        "User type created successfully",
        "User type not created");
}

async function UpdateUserType(req: Request, res: Response) {
    const IDUserType = req.params.id;
    let { Name, Clearance } = req.body;

    //search for the user type
    const userType = await getObject(res,
        'ReadByIDUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User type retrieved successfully",
        "User type not retrieved");
    if (!userType || userType.recordset.length === 0) { return res.status(404).send("Not user type found"); }

    //validate the json
    Name = Name || userType.recordset[0].Name;
    Clearance = Clearance || userType.recordset[0].Clearance;

    //update the user type
    await executeProcedure(res,
        'UpdateUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType },
        { name: 'Name', type: sql.NVarChar(64), value: Name },
        { name: 'Clearance', type: sql.Int, value: Clearance }],
        200,
        "User type updated successfully",
        "User type not updated");
};

async function DeleteUserType(req: Request, res: Response) {
    const IDUserType = req.params.id;
    await executeProcedure(res,
        'DeleteUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User type deleted successfully",
        "User type not deleted");
}

export default {
    AllUserTypes,
    UserTypeById,
    CreateUserType,
    UpdateUserType,
    DeleteUserType
};
