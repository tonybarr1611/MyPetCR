import express from 'express';

import client from '../controllers/client';
import employee from '../controllers/employee';
import inventory from '../controllers/inventory';
import product from '../controllers/product';
import productType from '../controllers/productType';
import store from '../controllers/store';
import log from '../controllers/log';
import logType from '../controllers/logType';
import review from '../controllers/review';
import userType from '../controllers/userType';
import user from '../controllers/user';

import paymentType from '../controllers/paymentType';
import payment from '../controllers/payment';
import status from '../controllers/status';
import invoice from '../controllers/invoice';
import invoiceDetail from '../controllers/invoiceDetail';
import petType from '../controllers/petType';
import pet from '../controllers/pet';
import breed from '../controllers/breed';
import appointment from '../controllers/appointment';
import address from '../controllers/address';
import shipping from '../controllers/shipping';
import cart from '../controllers/cart';

// import { Router } from 'express';
// import { sendEmail } from '../controllers/email';

const route = express.Router();

// user 
route.get('/user/mail/:mail', user.UserByMail); // alternative to id this one gives the hashedpassword
route.post('/user/verify', user.verifyPassword); // this is for the login
route.post('/user', user.CreateUser);
route.get('/user', user.AllUsers);
route.get('/user/:id', user.UserById);
route.put('/user/:id', user.UpdateUser);
route.delete('/user/:id', user.DeleteUser);

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
route.get('/review/average/:id', review.AverageReviewById);
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
route.get('/medicine', product.ReadMedicineOrServiceProducts);

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
route.get('/inventory/:IDProduct', inventory.ReadInventoryByIDProduct);
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
route.post('/clientAndUser', client.CreateClientAndUser);
route.get('/client', client.AllClients);
route.get('/clientMock', client.CreateMockClient);
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
route.post('/invoiceByCart', invoice.CreateInvoiceByCart);
route.get('/invoice', invoice.ReadAllInvoices);
route.get('/invoice/:id', invoice.ReadInvoicesByID);
route.get('/invoice/client/:id', invoice.ReadInvoicesByClient);
route.put('/invoice/:id', invoice.UpdateInvoice);
route.delete('/invoice/:id', invoice.DeleteInvoice);

// Invoice Detail
route.post('/invoiceDetail', invoiceDetail.CreateInvoiceDetail);
route.get('/invoiceDetail', invoiceDetail.ReadAllInvoiceDetails);
route.get('/invoiceDetail/:id', invoiceDetail.ReadInvoiceDetailById);
route.put('/invoiceDetail/:id', invoiceDetail.UpdateInvoiceDetail);
route.delete('/invoiceDetail/:id', invoiceDetail.DeleteInvoiceDetail);
route.get('/invoiceDetail/appointment/:id', invoiceDetail.ReadInvoiceDetailsByAppointmentID); //Id invoice

// Pet Type
route.post('/petType', petType.CreatePetType);
route.get('/petType', petType.ReadAllPetTypes);
route.get('/petType/:id', petType.ReadPetTypeById);
route.put('/petType/:id', petType.UpdatePetType);
route.delete('/petType/:id', petType.DeletePetType);

// Pet
route.post('/pet', pet.CreatePet);
route.get('/pet', pet.ReadAllPets);
route.get('/pet/:id', pet.ReadPetById);
route.get('/petByClient/:id', pet.ReadPetByClientId);
route.get('/petByClientName', pet.ReadPetByClientName);
route.put('/pet/:id', pet.UpdatePet);
route.delete('/pet/:id', pet.DeletePet);

// Breed
route.post('/breed', breed.CreateBreed);
route.get('/breed', breed.ReadAllBreeds);
route.get('/breed/:id', breed.ReadBreedById);
route.put('/breed/:id', breed.UpdateBreed);
route.delete('/breed/:id', breed.DeleteBreed);

// Appointment
route.post('/appointment', appointment.CreateAppointment);
route.get('/appointment', appointment.ReadAllAppointments);
route.get('/appointment/:id', appointment.ReadAppointmentByID);
route.put('/appointment/:id', appointment.UpdateAppointment);
route.delete('/appointment/:id', appointment.DeleteAppointment);
route.get('/appointment/pet/:id', appointment.ReadAllAppointmentsByPet); //Id pet 
route.get('/appointment/client/:id', appointment.ReadAppointmentsByClientID); //Id employee
route.post('/appointment/invoice', appointment.AddAppointmentAndInvoice);

// Address
route.post('/address', address.CreateAddress);
route.get('/address', address.ReadAllAddresses);
route.get('/address/:id', address.ReadAddressByID);
route.put('/address/:id', address.UpdateAddress);
route.delete('/address/:id', address.DeleteAddress);

// Shipping
route.post('/shipping', shipping.CreateAddress);
route.get('/shipping', shipping.ReadAllShippings);
route.get('/shipping/:id', shipping.ReadShippingByID);
route.put('/shipping/:id', shipping.UpdateShipping);
route.delete('/shipping/:id', shipping.DeleteShipping);

// Cart, it has a composite key
route.post('/cart', cart.CreateCart);
route.get('/cart/stock/:IDClient', cart.EnoughQuantityByCart);
route.get('/cart', cart.RealAllCarts);
route.get('/cart/:IDClient/:IDProduct', cart.ReadCartByIDClientAndIDProduct);
route.get('/cart/:IDClient/', cart.ReadCartByIDClient);
route.put('/cart/:IDClient/:IDProduct', cart.UpdateCart);
route.delete('/cart/:IDClient/:IDProduct', cart.DeleteCart);
route.delete('/cart/:IDClient', cart.DeleteAllCartByClient);

// Email
// route.post('/send-email', sendEmail);

export default route;