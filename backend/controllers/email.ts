import { Request, Response } from 'express';
import sql from 'mssql';
import nodemailer from 'nodemailer';
import { getObject } from './executeProcedure';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

interface SubjectDictionary {
    [key: number]: string;
}

interface BodyDictionary {
    [key: number]: string;
}

const SubjectForMail: SubjectDictionary = {
    1: "Notificación de Cancelación de Cita",
    2: "Confirmación de su Cita",
    3: "Nueva Asignación de Cita",
    4: "Notificación de Cancelación de Cita por el Cliente"
};

const BodyForMail : BodyDictionary = {
    
    1: `
    Estimado/a cliente
    Su cita ha sido cancelada. Disculpe las molestias
    Para mas información, consulte en la página web.
    Atentamente, My Pet C R
    `,
    2: `
    Estimado/a cliente,
    Su cita ha sido confirmada.
    Para mas información, consulte en la página web.
    Atentamente, My Pet CR
    `,
    3: `
    Estimado/a personal,
    Tiene una nueva cita asignada.
    Para mas información, consulte en la página web.
    Atentamente, My Pet CR
    `,
    4: `
    Estimado/a personal,
    Una cita ha sido cancelada por el cliente.
    Para mas información, consulte en la página web.
    Atentamente, My Pet CR
    `,
    
};

function GetSubject(IDSubject: number): string {
    return SubjectForMail[IDSubject];
}

function GetBody(IDSubject: number): string {
    return BodyForMail[IDSubject];
}

async function SendMail(req: Request, res: Response) {
    console.log(transporter);
    const ID = parseInt(req.params.IDSubject);
    const IDUser = req.params.IDUser;
    //Search for the user
    const user = await getObject(res,
        'ReadByIDUser',
        [{ name: 'IDUser', type: sql.Int, value: IDUser }],
        200,
        "User retrieved successfully",
        "User not retrieved");
    if (!user || user.recordset.length === 0) { return res.status(404).send("User not found"); }

    const mailOptions = {
        from: 'Victoraymesada159@gmail.com',
        to: user.recordset[0].LoginID,
        subject: GetSubject(ID),
        text: GetBody(ID) 
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        return res.status(200).send('Correo enviado: ' + info.response);
    });
} 

export { SendMail };