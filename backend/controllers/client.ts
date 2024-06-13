import {Response, Request} from 'express';
import sql from 'mssql';
import { executeProcedure, getObject } from './executeProcedure';



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
    if (!user) { res.status(404).send("User not found");}
    
    await executeProcedure(res,
        'CreateClient',
        [
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20) , value: PhoneNumber },
            { name: 'IDUser', type: sql.Int, value: IDUser }
        ],
        201,
        "Client created successfully",
        "Client not created");
}

async function UpdateClient(req: Request, res: Response) {
    let {Name, PhoneNumber, IDUser} = req.body;
    const IDClient = req.params.id;

    // Search for the client
    const client = await getObject(res,
        'ReadByIDClient',
        [{ name: 'IDClient', type : sql.Int , value: IDClient}],
        200,
        "Client retrieved successfully",
        "Client not retrieved");
    if (!client) {
        return res.status(404).send("Client not found");
    }

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
    if (!user) { res.status(404).send("User not found");}
    
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
    UpdateClient,
    DeleteClient
}