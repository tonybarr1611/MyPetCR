import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Appointment } from '../entity/Appointment';

const sendEmail = async (req: Request, res: Response) => {
    const { idUser, subject, body } = req.body;

    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(idUser);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.LoginID,
            subject: subject,
            text: body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Email sent: ' + info.response);
        });
    } catch (error) {
        res.status(500).send('Error sending email');
    }
};

const sendAppointmentConfirmation = async (appointment: Appointment) => {
    const userRepository = getRepository(User);
    const client = await userRepository.findOne(appointment.IDClient);
    const employee = await userRepository.findOne(appointment.IDEmployee);

    if (client && employee) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: client.LoginID,
            subject: 'Appointment Confirmation',
            text: `Dear ${client.Name},\n\nYour appointment is confirmed.\n\nAppointment details:\n\nDate and Time: ${appointment.DateTime}\n\nThank you for choosing our service.\n\nBest regards,\nYour Pet Care Team`,
        };

        const employeeMailOptions = {
            from: process.env.EMAIL_USER,
            to: employee.LoginID,
            subject: 'Appointment Confirmation',
            text: `Dear ${employee.Name},\n\nYou have a new appointment assigned.\n\nAppointment details:\n\nDate and Time: ${appointment.DateTime}\n\nThank you for your service.\n\nBest regards,\nYour Pet Care Team`,
        };

        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to client:', error);
            } else {
                console.log('Email sent to client:', info.response);
            }
        });

        transporter.sendMail(employeeMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to employee:', error);
            } else {
                console.log('Email sent to employee:', info.response);
            }
        });
    }
};

const sendAppointmentCancellation = async (appointment: Appointment) => {
    const userRepository = getRepository(User);
    const client = await userRepository.findOne(appointment.IDClient);
    const employee = await userRepository.findOne(appointment.IDEmployee);

    if (client && employee) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: client.LoginID,
            subject: 'Appointment Cancellation',
            text: `Dear ${client.Name},\n\nYour appointment has been cancelled.\n\nAppointment details:\n\nDate and Time: ${appointment.DateTime}\n\nWe apologize for any inconvenience.\n\nBest regards,\nYour Pet Care Team`,
        };

        const employeeMailOptions = {
            from: process.env.EMAIL_USER,
            to: employee.LoginID,
            subject: 'Appointment Cancellation',
            text: `Dear ${employee.Name},\n\nThe following appointment has been cancelled.\n\nAppointment details:\n\nDate and Time: ${appointment.DateTime}\n\nWe apologize for any inconvenience.\n\nBest regards,\nYour Pet Care Team`,
        };

        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to client:', error);
            } else {
                console.log('Email sent to client:', info.response);
            }
        });

        transporter.sendMail(employeeMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to employee:', error);
            } else {
                console.log('Email sent to employee:', info.response);
            }
        });
    }
};

const sendUnauthorizedAccessAttempt = async (idLog: number) => {
    const userRepository = getRepository(User);
    const adminUsers = await userRepository.find({
        where: [
            { IDUserType: 1 },
            { IDUserType: 2 },
        ],
    });

    if (adminUsers.length > 0) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        adminUsers.forEach((admin) => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: admin.LoginID,
                subject: 'Unauthorized Access Attempt',
                text: `Dear ${admin.Name},\n\nAn unauthorized access attempt was detected.\n\nLog ID: ${idLog}\n\nPlease review the log for more details.\n\nBest regards,\nYour Security Team`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email to admin:', error);
                } else {
                    console.log('Email sent to admin:', info.response);
                }
            });
        });
    }
};

export { sendEmail, sendAppointmentConfirmation, sendAppointmentCancellation, sendUnauthorizedAccessAttempt };