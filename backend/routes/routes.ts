import express from 'express';

import paymentType from '../controllers/paymentType';
import payment from '../controllers/payment';

const route = express.Router();

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

export default route;