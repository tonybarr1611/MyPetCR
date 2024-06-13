import express from 'express';

import client from '../controllers/client';
import employee from '../controllers/employee';
import inventory from '../controllers/inventory';
import product from '../controllers/product';
import productType from '../controllers/productType';
import store from '../controllers/store';
import paymentType from '../controllers/paymentType';
import payment from '../controllers/payment';
import status from '../controllers/status';
import invoice from '../controllers/invoice';
import invoiceDetail from '../controllers/invoiceDetail';

import log from '../controllers/log';
import logType from '../controllers/logType';
import review from '../controllers/review';
import userType from '../controllers/userType';
const route = express.Router();

// user type
route.post('/userType', userType.CreateUserType);
route.get('/userType', userType.AllUserTypes);
route.get('/userType/:id', userType.UserTypeById);
route.put('/userType/:id', userType.UpdateUserType);
route.delete('/userType/:id', userType.DeleteUserType);

// review
route.post('/review', review.CreateReview);
route.get('/review', review.AllReviews);
route.get('/review/:id', review.ReviewById);
route.put('/review/:id', review.UpdateReview);
route.delete('/review/:id', review.DeleteReview);

// logType
route.post('/logType', logType.CreateLogType);
route.get('/logType', logType.AllLogTypes);
route.get('/logType/:id', logType.LogTypeById);
route.put('/logType/:id', logType.UpdateLogType);
route.delete('/logType/:id', logType.DeleteLogType);

// log
route.post('/log', log.CreateLog);
route.get('/log', log.AllLogs);
route.get('/log/:id', log.LogById);
route.put('/log/:id', log.UpdateLog);
route.delete('/log/:id', log.DeleteLog);

// store
route.post('/store', store.CreateStore);
route.get('/store', store.AllStores);
route.get('/store/:id', store.StoreById);
route.put('/store/:id', store.UpdateStore);
route.delete('/store/:id', store.DeleteStore);

// product
route.post('/product', product.CreateProduct);
route.get('/product', product.AllProducts);
route.get('/product/:id', product.ProductById);
route.put('/product/:id', product.UpdateProduct);
route.delete('/product/:id', product.DeleteProduct);

// productType
route.post('/productType', productType.CreateProductType);
route.get('/productType', productType.AllProductTypes);
route.get('/productType/:id', productType.ProductTypeById);
route.put('/productType/:id', productType.UpdateProductType);
route.delete('/productType/:id', productType.DeleteProductType);

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

// Invoice Detail
route.post('/invoiceDetail', invoiceDetail.CreateInvoiceDetail);
route.get('/invoiceDetail', invoiceDetail.ReadAllInvoiceDetails);
route.get('/invoiceDetail/:id', invoiceDetail.ReadInvoiceDetailById);
route.put('/invoiceDetail/:id', invoiceDetail.UpdateInvoiceDetail);
route.delete('/invoiceDetail/:id', invoiceDetail.DeleteInvoiceDetail);

export default route;