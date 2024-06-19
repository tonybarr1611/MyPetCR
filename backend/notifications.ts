import { sendMail } from './mailer';
import { getUserEmailById, getAdminEmails, getManagerEmails } from './utils';

export const sendAppointmentConfirmation = async (clientId: number, employeeId: number, appointmentDetails: string) => {
    const clientEmail = await getUserEmailById(clientId);
    const employeeEmail = await getUserEmailById(employeeId);
    
    const subject = 'Appointment Confirmation';
    const text = `Your appointment has been confirmed. Details: ${appointmentDetails}`;
    const html = `<p>Your appointment has been confirmed. Details: ${appointmentDetails}</p>`;

    await sendMail(clientEmail, subject, text, html);
    await sendMail(employeeEmail, subject, text, html);
};

export const sendAppointmentCancellation = async (clientId: number, employeeId: number, appointmentDetails: string) => {
    const clientEmail = await getUserEmailById(clientId);
    const employeeEmail = await getUserEmailById(employeeId);

    const subject = 'Appointment Cancellation';
    const text = `Your appointment has been cancelled. Details: ${appointmentDetails}`;
    const html = `<p>Your appointment has been cancelled. Details: ${appointmentDetails}</p>`;

    await sendMail(clientEmail, subject, text, html);
    await sendMail(employeeEmail, subject, text, html);
};

export const sendUnauthorizedAccessAttempt = async (userId: number, attemptDetails: string) => {
    const adminEmails = await getAdminEmails();
    const managerEmails = await getManagerEmails();

    const subject = 'Unauthorized Access Attempt';
    const text = `An unauthorized access attempt was detected. Details: ${attemptDetails}`;
    const html = `<p>An unauthorized access attempt was detected. Details: ${attemptDetails}</p>`;

    for (const email of [...adminEmails, ...managerEmails]) {
        await sendMail(email, subject, text, html);
    }
};
