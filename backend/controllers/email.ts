// import { Request, Response } from 'express';
// import nodemailer from 'nodemailer';
// import { getRepository } from 'typeorm';
// import { User } from '../entity/User';

// const sendEmail = async (req: Request, res: Response) => {
//     const { idUser, subject, body } = req.body;

//     try {
//         const userRepository = getRepository(User);
//         const user = await userRepository.findOne(idUser);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.GMAIL_USER,
//                 pass: process.env.GMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.GMAIL_USER,
//             to: user.LoginID,
//             subject: subject,
//             text: body,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return res.status(500).send(error.toString());
//             }
//             res.status(200).send('Email sent: ' + info.response);
//         });
//     } catch (error) {
//         res.status(500).send('Error sending email');
//     }
// };

// export { sendEmail };
