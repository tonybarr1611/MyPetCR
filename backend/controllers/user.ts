import bcript from 'bcrypt';
import sql from 'mssql'; 
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { executeProcedure, getObject } from './executeProcedure';
import axios from 'axios';
async function UserByMail(req: Request, res: Response) {
    const LoginID = req.params.mail;

    await executeProcedure(res,
        'ReadUserByMail',
        [{ name: 'LoginID', type: sql.NVarChar, value: LoginID }],
        200,
        "User retrieved successfully",
        "User not retrieved");
};

async function verifyPassword(req: Request, res: Response) {
    const { Password, LoginID} = req.body;
    //validate the json
    if (!Password || !LoginID) {
        return res.status(400).send("Missing required fields");
    }

    //search for the user
    const user = await getObject(res,
        'ReadUserByMail',
        [{ name: 'LoginID', type: sql.NVarChar, value: LoginID }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) return res.status(404).send("User not found");

    const clients = await getObject(res,
        'ReadAllClients',
        [],
        200,
        "Clients retrieved successfully",
        "Clients not retrieved");
    if (!clients || clients.recordset.length === 0) return res.status(404).send("Clients not found");

    const client = clients.recordset.find((client: any) => client.IDUser === user.recordset[0].IDUser);

    //compare the passwords
    const hashedPassword = user.recordset[0].Password;
    const result = await bcript.compare(Password, hashedPassword);
    
    if (!result) {
        await axios.post(`http://localhost:8080/api/v1/danger-email`);
        return res.status(401).send("Invalid password");
    }else{
        const token = jwt.sign(
            {
                IDUser: user?.recordset[0].IDUser,
                IDUserType: user?.recordset[0].IDUserType,
            },
            "RANDOM-TOKEN",
            { expiresIn: "30m" }
        );
        return res.status(200).send({
          message: "Login Successful",
          token,
          userType: user?.recordset[0].IDUserType,
          client: client
        });
    };
};

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

    await executeProcedure(res,
        'CreateUser',
        [{ name: 'LoginID', type: sql.NVarChar, value: LoginID },
        { name: 'Password', type: sql.NVarChar, value: hashedPassword},
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
        binaryPassword = await bcript.hash(Password, salt);
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
        { name: 'NewPassword', type: sql.NVarChar, value: binaryPassword },
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
    DeleteUser,
    UserByMail,
    verifyPassword
};