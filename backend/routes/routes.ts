import express from 'express';

import paymentType from '../controllers/paymentType';
import payment from '../controllers/payment';
import status from '../controllers/status';
import invoice from '../controllers/invoice';
import client from '../controllers/client';

const route = express.Router();
// Client 
route.post('/client', client.CreateClient);
route.get('/client', client.AllClients);
route.get('/client/:id', client.ClientById);
route.put('/client/:id', client.UpdateClient);
route.delete('/client/:id', client.DeleteClient);

// Payment Types
route.post('/paymentType', paymentType.CreatePaymentType);
route.get('/paymentType', paymentType.ReadAllPaymentTypes);
route.get('/paymentType/:id', paymentType.ReadPaymentTypeByID);
route.put('/paymentType/:id', paymentType.UpdatePaymentType);
route.delete('/paymentType/:id', paymentType.DeletePaymentType);

// Payment
route.post('/payment', payment.CreatePayment);
route.get('/payment', payment.ReadAllPayments);
route.get('/payment/:id', payment.ReadPaymentByID);
route.put('/payment/:id', payment.UpdatePayment);
route.delete('/payment/:id', payment.DeletePayment);

// Status
route.post('/status', status.CreateStatus);
route.get('/status', status.ReadAllStatus);
route.get('/status/:id', status.ReadStatusByID);
route.put('/status/:id', status.UpdateStatus);
route.delete('/status/:id', status.DeleteStatus);

// Invoice
route.post('/invoice', invoice.CreateInvoice);
route.get('/invoice', invoice.ReadAllInvoices);
route.get('/invoice/:id', invoice.ReadInvoicesByID);
route.put('/invoice/:id', invoice.UpdateInvoice);
route.delete('/invoice/:id', invoice.DeleteInvoice);

export default route;