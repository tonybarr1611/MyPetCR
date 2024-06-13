import bcript from 'bcrypt';
import sql from 'mssql'; 
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';

async function AllUsers(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllUsers',
        [],
        200,
        "Users retrieved successfully",
        "Users not retrieved");
}

async function UserById(req: Request, res: Response) {
    const IDUser = req.params.id;
    await executeProcedure(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
}

async function CreateUser(req: Request, res: Response) {
    const { LoginID , Password, IDUserType } = req.body;
    //validate the json
    if (!LoginID || !Password || !IDUserType) {
        return res.status(400).send("Missing required fields");
    }
    //validate idUserType
    const userType = await getObject(res,
        'ReadByIDUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User type retrieved successfully",
        "User type not retrieved");
    if (!userType || userType.recordset.length === 0) { return res.status(404).send("Not user type found"); }

    //hash the password
    const salt = await bcript.genSalt(10);
    let hashedPassword = await bcript.hash(Password, salt);
    const binaryPassword = Buffer.from(hashedPassword, 'utf-8');
    
    //create the user
    await executeProcedure(res,
        'CreateUser',
        [{ name: 'LoginID', type: sql.NVarChar, value: LoginID },
        { name: 'Password', type: sql.VarBinary, value: binaryPassword },
        { name: 'IDUserType', type: sql.Int, value: IDUserType }],
        201,
        "User created successfully",
        "User not created");
}

async function UpdateUser(req: Request, res: Response) {
    let binaryPassword = null;
    const IDUser = req.params.id;
    let { LoginID, Password, IDUserType } = req.body;

    //search for the user
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) return res.status(404).send("User not found");

    //validate the json
    LoginID = LoginID || user.recordset[0].LoginID;

    //password
    if (Password) {
        const salt = await bcript.genSalt(10);
        Password = await bcript.hash(Password, salt);
        binaryPassword = Buffer.from(Password, 'utf-8');
    } else { binaryPassword = user.recordset[0].Password; }

    IDUserType = IDUserType || user.recordset[0].IDUserType;

    //validate idUserType
    const userType = await getObject(res,
        'ReadByIDUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User type retrieved successfully",
        "User type not retrieved");
    if (!userType || userType.recordset.length === 0) { return res.status(404).send("Not user type found"); }

    //update the user
    await executeProcedure(res,
        'UpdateUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser },
        { name: 'LoginID', type: sql.NVarChar, value: LoginID },
        { name: 'NewPassword', type: sql.VarBinary, value: binaryPassword },
        { name: 'IDUserType', type: sql.Int, value: IDUserType }],
        200,
        "User updated successfully",
        "User not updated");
};

async function DeleteUser(req: Request, res: Response) {
    const IDUser = req.params.id;
    await executeProcedure(res,
        'DeleteUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User deleted successfully",
        "User not deleted");
}

export default {
    AllUsers,
    UserById,
    CreateUser,
    UpdateUser,
    DeleteUser
};