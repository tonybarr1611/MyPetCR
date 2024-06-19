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
    1: "Appointment Cancellation Notification",
    2: "Appointment Confirmation",
    3: "New Appointment Assignment",
    4: "Appointment Cancellation Notification by Client"
};


const BodyForMail: BodyDictionary = {
    1: `
    Dear customer,
    Your appointment has been canceled. We apologize for any inconvenience.
    For more information, please check our website.
    Best regards, My Pet CR
    `,
    2: `
    Dear customer,
    Your appointment has been confirmed.
    For more information, please check our website.
    Best regards, My Pet CR
    `,
    3: `
    Dear staff,
    You have been assigned a new appointment.
    For more information, please check our website.
    Best regards, My Pet CR
    `,
    4: `
    Dear staff,
    An appointment has been canceled by the customer.
    For more information, please check our website.
    Best regards, My Pet CR
    `,
};


function GetSubject(IDSubject: number): string {
    return SubjectForMail[IDSubject];
}

function GetBody(IDSubject: number): string {
    return BodyForMail[IDSubject];
}

async function SendEmail(req: Request, res: Response) {
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
        from: process.env.USER,
        to: user.recordset[0].LoginID,
        subject: GetSubject(ID),
        text: GetBody(ID) 
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        return res.status(200).send('Email send:  ' + info.response);
    });
} 

async function DangerEmail(req: Request, res: Response) {
    //search all the users
    const users = await getObject(res,
        'ReadAllUsers',
        [],
        200,
        "Users retrieved successfully",
        "Users not retrieved");
    if (!users || users.recordset.length === 0) { return res.status(404).send("Users not found"); }

    //loop through all the users
    users.recordset.forEach((user: any) => {
        if (user.IDUserType === 4) return;
        
        const mailOptions = {
            from: process.env.USER,
            to: user.LoginID,
            subject: 'My Pet C R Security alert: Unauthorized access attempt',
            text: `Dear employees and administrators of My Pet C R,

            An unauthorized access attempt to an account has been detected.
            Please contact support staff if you have any questions.
            For the management of the company, please access the website and check security immediately.

            Best regards,
            My Pet C R Team`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.message);
            }
            return res.status(200).send('Correo enviado: ' + info.response);
        });
    });
    
    }
export default { 
    SendEmail ,
    DangerEmail
};