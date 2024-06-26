import sql from 'mssql';
import { executeProcedure, getItem, getObject } from './executeProcedure';
import { Request, Response } from 'express';

async function AllEmployees(req: Request, res: Response) {
    await executeProcedure(res,
        'ReadAllEmployees',
        [],
        200,
        "Employees retrieved successfully",
        "Employees not retrieved");
}

async function EmployeeById(req: Request, res: Response) {
    const IDEmployee = req.params.id;
    await executeProcedure(res,
        'ReadByIDEmployee',
        [{ name: 'IDEmployee', type: sql.Int, value: IDEmployee }],
        200,
        "Employee retrieved successfully",
        "Employee not retrieved");
}

async function UpdateEmployee(req: Request, res: Response) {
    const IDEmployee = req.params.id;
    let { Name, PhoneNumber, IDUser} = req.body;

    //find the employee
    const employee = await getObject(res,
        'ReadByIDEmployee',
        [{ name: 'IDEmployee', type: sql.Int, value: IDEmployee }],
        200,
        "Employee retrieved successfully",
        "Employee not retrieved");
    if (!employee || employee.recordset.length === 0) { return res.status(404).send("Employee not found");}

    //validate the json
    Name = Name || employee.recordset[0].Name;
    PhoneNumber = PhoneNumber || employee.recordset[0].PhoneNumber;
    IDUser = IDUser || employee.recordset[0].IDUser;

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { res.status(404).send("User not found"); }

    //update the employee
    await executeProcedure(res,
        'UpdateEmployee',
        [
            { name: 'IDEmployee', type: sql.Int, value: IDEmployee },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20), value: PhoneNumber },
            { name: 'IDUser', type: sql.Int, value: IDUser}
        ],
        200,
        "Employee updated successfully",
        "Employee not updated");
};

async function DowngradeEmployee(req: Request, res: Response) {
    const IDUser = req.params.id;

    const employee = await getItem(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }]
    );
    if (!employee || employee.recordset.length === 0) { return res.status(404).send("User not found");}

    await executeProcedure(res,
        'DowngradeEmployeeToClient',
        [
            { name: 'IDUser', type: sql.Int, value: IDUser }
        ],
        200,
        "Employee downgraded successfully",
        "Employee not downgraded");
};

async function CreateEmployee(req: Request, res: Response) {
    const { IDUser, Name, PhoneNumber } = req.body;
    //validate the json
    if (!IDUser || !Name || !PhoneNumber) {
        return res.status(400).send("Missing required fields");
    }

    //validate idUser
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { res.status(404).send("User not found"); }

    //create the employee
    await executeProcedure(res,
        'CreateEmployee',
        [
            { name: 'IDUser', type: sql.Int, value: IDUser },
            { name: 'Name', type: sql.NVarChar(255), value: Name },
            { name: 'PhoneNumber', type: sql.NVarChar(20), value: PhoneNumber }
        ],
        201,
        "Employee created successfully",
        "Employee not created");
}

async function DeleteEmployee(req: Request, res: Response) {
    const IDEmployee = req.params.id;
    await executeProcedure(res,
        'DeleteEmployee',
        [{ name: 'IDEmployee', type: sql.Int, value: IDEmployee }],
        200,
        "Employee deleted successfully",
        "Employee not deleted");
}

export default{
    AllEmployees,
    EmployeeById,
    CreateEmployee,
    DeleteEmployee,
    UpdateEmployee,
    DowngradeEmployee
};