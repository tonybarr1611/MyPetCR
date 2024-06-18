import bcript from 'bcrypt';
import sql from 'mssql';
import {Response, Request} from 'express';
import { executeProcedure, getObject, getItem } from './executeProcedure';

async function AllClients(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllClients',
        [],
        200,
        "Clients retrieved successfully",
        "Clients not retrieved");
}

async function ClientById(req: Request, res: Response) {
    const IDClient = req.params.id;
    await executeProcedure(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type : sql.Int , value: IDClient}],
        200,
        "Client retrieved successfully",
        "Client not retrieved");
}

async function CreateClient(req: Request, res: Response) {
    const {Name, PhoneNumber, IDUser} = req.body
    console.log(req.body)
    console.log(Name, PhoneNumber, IDUser)
    //validate the json
    if (!Name || !PhoneNumber || !IDUser) {
        return res.status(400).send("Missing required fields");
    }

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { res.status(404).send("User not found");}
    
    await executeProcedure(res,
        'CreateClientAndUser',
        [
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20) , value: PhoneNumber },
            { name: 'IDUser', type: sql.Int, value: IDUser }
        ],
        201,
        "Client created successfully",
        "Client not created");
}

async function CreateMockClient(req: Request, res: Response) {
    await executeProcedure(res,
        'CreateMockClient',
        [],
        201,
        "Client mock created successfully",
        "Client mock not created");
}

async function CreateClientAndUser(req: Request, res: Response) {
    const {Name, PhoneNumber, Password, LoginID, IDUserType} = req.body
    
    if (!Name || !PhoneNumber || !Password || !LoginID || !IDUserType) {
        return res.status(400).send("Missing required fields");
    }

    const userType = await getItem(res,
        'ReadByIDUserType',
        [{ name: 'IDUserType', type: sql.Int, value: IDUserType }]
    );
    if (!userType || userType.recordset.length === 0) { res.status(404).send("User type not found");}

    const user = await getItem(res,
        'ReadUserByMail',
        [{ name: 'LoginID', type: sql.NVarChar, value: LoginID }]
    );    
    if (user && user.recordset.length != 0) {         
        return res.status(400).send("Mail already in use");
    }    

    const salt = await bcript.genSalt(10);   
    let hashedPassword = await bcript.hash(Password, salt);
    
    await executeProcedure(res,
        'CreateClientAndUser',
        [
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20) , value: PhoneNumber },
            { name: 'Password', type: sql.NVarChar, value: hashedPassword },
            { name: 'LoginID', type: sql.NVarChar, value: LoginID },
            { name: 'IDUserType', type: sql.Int, value: IDUserType }
        ],
        201,
        "Client created successfully",
        "Client not created");
}

async function UpdateClient(req: Request, res: Response) {
    const IDClient = req.params.id;
    
    // Search for the client
    const client = await getObject(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type : sql.Int , value: IDClient}],
        200,
        "Client retrieved successfully",
        "Client not retrieved");
    if (!client || client.recordset.length === 0) {
        return res.status(404).send("Client not found");
    }

    let {Name, PhoneNumber, IDUser} = req.body;

    //validate the json
    Name = Name || client.recordset[0].Name;
    PhoneNumber = PhoneNumber || client.recordset[0].PhoneNumber;
    IDUser = IDUser || client.recordset[0].IDUser;

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { res.status(404).send("User not found");}
    
    // Update the client
    await executeProcedure(res,
        'UpdateClient',
        [
            { name: 'IDClient', type: sql.Int, value: IDClient },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20), value: PhoneNumber },
            { name: 'IDUser', type: sql.Int, value: IDUser }
        ],
        200,
        "Client updated successfully",
        "Client not updated");

}

async function DeleteClient(req: Request, res: Response) { 
    const IDClient = req.params.id;
    await executeProcedure(res,
        'DeleteClient',
        [{ name: 'IDClient', type : sql.Int , value: IDClient}],
        200,
        "Client deleted successfully",
        "Client not deleted");
}

export default {
    AllClients,
    ClientById,
    CreateClient,
    CreateClientAndUser,
    CreateMockClient,
    UpdateClient,
    DeleteClient
}