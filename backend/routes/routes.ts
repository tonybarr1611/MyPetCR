import express from 'express';

import paymentType from '../controllers/paymentType';
import payment from '../controllers/payment';
import status from '../controllers/status';
import invoice from '../controllers/invoice';
import client from '../controllers/client';
import employee from '../controllers/employee';
import inventory from '../controllers/inventory';
import product from '../controllers/product';
const route = express.Router();

// product
route.post('/product', product.CreateProduct);
route.get('/product', product.AllProducts);
route.get('/product/:id', product.ProductById);
route.put('/product/:id', product.UpdateProduct);
route.delete('/product/:id', product.DeleteProduct);

// inventory, it has a composite key
route.post('/inventory', inventory.CreateInventory);
route.get('/inventory', inventory.AllInventories);
route.get('/inventory/:IDProduct/:IDStore', inventory.InventoryById);
route.put('/inventory/:IDProduct/:IDStore', inventory.UpdateInventory);
route.delete('/inventory/:IDProduct/:IDStore', inventory.DeleteInventory);

// Employee
route.post('/employee', employee.CreateEmployee);
route.get('/employee', employee.AllEmployees);
route.get('/employee/:id', employee.EmployeeById);
route.put('/employee/:id', employee.UpdateEmployee);
route.delete('/employee/:id', employee.DeleteEmployee);

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