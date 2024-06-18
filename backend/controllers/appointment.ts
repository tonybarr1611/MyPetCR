import { Request, Response } from 'express';
import sql from 'mssql';

import { executeProcedure, getItem } from './executeProcedure';

async function CreateAppointment(req: Request, res: Response) {
    const { IDPet, IDEmployee, IDStore, IDStatus, DateTime } = req.body;

    if (!IDPet || !IDEmployee || !IDStore|| !IDStatus || !DateTime) {
        return res.status(400).send("Missing required fields");
    }

    const pet = await getItem(res,
        'ReadByIDPet',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }]
    );
    if (pet?.recordset.length == 0) { return res.status(404).send("Appointment not created: pet not found"); }

    const employee = await getItem(res,
        'ReadByIDEmployee',
        [{ name: 'IDEmployee', type: sql.Int, value: IDEmployee }]
    );
    if (employee?.recordset.length == 0) { return res.status(404).send("Appointment not created: employee not found"); }

    const store = await getItem(res,
        'ReadByIDStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore }]
    );
    if (store?.recordset.length == 0) { return res.status(404).send("Appointment not created: store not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Appointment not created: status not found"); }

    await executeProcedure(res, 
        'CreateAppointment', 
        [
            { name: 'IDPet', type: sql.Int, value: IDPet },
            { name: 'IDEmployee', type: sql.Int, value: IDEmployee },
            { name: 'IDStore', type: sql.Int, value: IDStore },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'DateTime', type: sql.DateTime, value: DateTime }
        ], 
        201, 
        "Appointment created successfully", 
        "Appointment not created");
};

async function ReadAllAppointmentsByPet(req: Request, res: Response) {
    const IDPet = req.params.id;
    await executeProcedure(res,
        'ReadAppointmentsByPet',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }],
        200,
        "",
        "Appointments not retrieved");
};

async function ReadAllAppointments(req: Request, res: Response) {
    await executeProcedure(res, 
        'ReadAllAppointments', 
        [], 
        200, 
        "", 
        "Appointments not retrieved");
};

async function ReadAppointmentByID(req: Request, res: Response) {
    const IDAppointment = req.params.id;

    await executeProcedure(res, 
        'ReadByIDAppointment', 
        [{ name: 'IDAppointment', type: sql.Int, value: IDAppointment }], 
        200, 
        "", 
        "Appointment not retrieved");
};

async function UpdateAppointment(req: Request, res: Response) {
    const IDAppointment = req.params.id;

    const appointment = await getItem(res,
        'ReadByIDAppointment',
        [{ name: 'IDAppointment', type: sql.Int, value: IDAppointment }]
    );
    if (appointment?.recordset.length == 0) { return res.status(404).send("Appointment not found"); }

    const IDPet = req.body.IDPet || appointment?.recordset[0].IDPet;
    const IDEmployee = req.body.IDEmployee || appointment?.recordset[0].IDEmployee;
    const IDStore = req.body.IDStore || appointment?.recordset[0].IDStore;
    const IDStatus = req.body.IDStatus || appointment?.recordset[0].IDStatus;
    const DateTime = req.body.DateTime || appointment?.recordset[0].DateTime;

    const pet = await getItem(res,
        'ReadByIDPet',
        [{ name: 'IDPet', type: sql.Int, value: IDPet }]
    );
    if (pet?.recordset.length == 0) { return res.status(404).send("Appointment not updated: pet not found"); }

    const employee = await getItem(res,
        'ReadByIDEmployee',
        [{ name: 'IDEmployee', type: sql.Int, value: IDEmployee }]
    );
    if (employee?.recordset.length == 0) { return res.status(404).send("Appointment not updated: employee not found"); }

    const store = await getItem(res,
        'ReadByIDStore',
        [{ name: 'IDStore', type: sql.Int, value: IDStore }]
    );
    if (store?.recordset.length == 0) { return res.status(404).send("Appointment not updated: store not found"); }

    const status = await getItem(res,
        'ReadByIDStatus',
        [{ name: 'IDStatus', type: sql.Int, value: IDStatus }]
    );
    if (status?.recordset.length == 0) { return res.status(404).send("Appointment not updated: status not found"); }

    await executeProcedure(res, 
        'UpdateAppointment', 
        [
            { name: 'IDAppointment', type: sql.Int, value: IDAppointment },
            { name: 'IDPet', type: sql.Int, value: IDPet },
            { name: 'IDEmployee', type: sql.Int, value: IDEmployee },
            { name: 'IDStore', type: sql.Int, value: IDStore },
            { name: 'IDStatus', type: sql.Int, value: IDStatus },
            { name: 'DateTime', type: sql.DateTime, value: DateTime }
        ], 
        201,
        "Appointment updated successfully", 
        "Appointment not updated");
};

async function DeleteAppointment(req: Request, res: Response) {
    const IDAppointment = req.params.id;

    await executeProcedure(res, 
        'DeleteAppointment', 
        [{ name: 'IDAppointment', type: sql.Int, value: IDAppointment }], 
        201, 
        "Appointment removed successfully", 
        "Appointment not removed");
};

export default {
    CreateAppointment,
    ReadAllAppointments,
    ReadAppointmentByID,
    UpdateAppointment,
    DeleteAppointment,
    ReadAllAppointmentsByPet
}