INSERT INTO [User] (IDUserType, LoginID, Password)
VALUES 
(1, 'john.doe@example.com', 'password123'),
(2, 'jane.smith@example.com', 'password123'),
(3, 'carlos.martinez@example.com', 'password123'),
(2, 'laura.gonzalez@example.com', 'password123'),
(3, 'roberto.mendez@example.com', 'password123'),
(2, 'fernanda.arias@example.com', 'password123'),
(3, 'luis.castillo@example.com', 'password123'),
(2, 'mariana.quezada@example.com', 'password123'),
(3, 'jorge.vargas@example.com', 'password123'),
(2, 'ana.solis@example.com', 'password123'),
(3, 'maria.chaves@example.com', 'password123'),
(2, 'daniel.rojas@example.com', 'password123'),
(3, 'sandra.brenes@example.com', 'password123'),
(2, 'jose.lopez@example.com', 'password123'),
(3, 'martha.murillo@example.com', 'password123'),
(2, 'andrea.martinez@example.com', 'password123'),
(3, 'antonio.ruiz@example.com', 'password123'),
(2, 'silvia.valverde@example.com', 'password123'),
(3, 'carmen.gutierrez@example.com', 'password123'),
(2, 'miguel.mora@example.com', 'password123');

INSERT INTO LogType (Name)
VALUES 
('Error'),
('Warning'),
('Info'),
('Debug'),
('Audit'),
('Critical'),
('Trace'),
('Alert'),
('Notice'),
('Emergency'),
('Security'),
('Performance'),
('Configuration'),
('Access'),
('Database'),
('Application'),
('System'),
('Network'),
('User'),
('Other');

INSERT INTO Log (IDLogType, IDUser, DateTime, Description)
VALUES 
(1, 1, '2024-05-01 08:00:00', 'System error occurred'),
(2, 2, '2024-05-02 09:15:00', 'Warning: Low disk space'),
(3, 3, '2024-05-03 10:30:00', 'Information: User login successful'),
(4, 4, '2024-05-04 11:45:00', 'Debug: Variable value checked'),
(5, 5, '2024-05-05 12:00:00', 'Audit: Data access logged'),
(6, 6, '2024-05-06 13:15:00', 'Critical: Application crash'),
(7, 7, '2024-05-07 14:30:00', 'Trace: Function entry recorded'),
(8, 8, '2024-05-08 15:45:00', 'Alert: High CPU usage detected'),
(9, 9, '2024-05-09 16:00:00', 'Notice: New user registered'),
(10, 10, '2024-05-10 17:15:00', 'Emergency: Server down'),
(11, 11, '2024-05-11 18:30:00', 'Security: Unauthorized access attempt'),
(12, 12, '2024-05-12 19:45:00', 'Performance: Slow query logged'),
(13, 13, '2024-05-13 20:00:00', 'Configuration: Setting updated'),
(14, 14, '2024-05-14 21:15:00', 'Access: User permission granted'),
(15, 15, '2024-05-15 22:30:00', 'Database: Record inserted'),
(16, 16, '2024-05-16 23:45:00', 'Application: Module loaded'),
(17, 17, '2024-05-17 00:00:00', 'System: Service started'),
(18, 18, '2024-05-18 01:15:00', 'Network: Connection established'),
(19, 19, '2024-05-19 02:30:00', 'User: Profile updated'),
(20, 20, '2024-05-20 03:45:00', 'Other: Custom event recorded');

INSERT INTO Client (IDUser, Name, PhoneNumber)
VALUES 
(2, 'Jane Smith', '88885556'),
(2, 'Laura Gonzalez', '88885558'),
(2, 'Fernanda Arias', '88885560'),
(2, 'Mariana Quezada', '88885562'),
(2, 'Ana Solis', '88885564'),
(2, 'Maria Chaves', '88885565'),
(2, 'Daniel Rojas', '88885566'),
(2, 'Sandra Brenes', '88885567'),
(2, 'Jose Lopez', '88885568'),
(2, 'Martha Murillo', '88885569'),
(2, 'Andrea Martinez', '88885570'),
(2, 'Silvia Valverde', '88885572'),
(2, 'Carmen Gutierrez', '88885573'),
(2, 'Miguel Mora', '88885574'),
(2, 'Pablo Vargas', '88885575'),
(2, 'Lucia Porras', '88885576'),
(2, 'Diana Gomez', '88885577'),
(2, 'Manuel Soto', '88885578'),
(2, 'Claudia Jimenez', '88885579'),
(2, 'Rafael Alvarado', '88885580');

INSERT INTO Employee (IDUser, Name, PhoneNumber)
VALUES 
(3, 'Carlos Martinez', '88885557'),
(3, 'Roberto Mendez', '88885559'),
(3, 'Luis Castillo', '88885561'),
(3, 'Jorge Vargas', '88885563'),
(3, 'Maria Chaves', '88885565'),
(3, 'Martha Murillo', '88885569'),
(3, 'Silvia Valverde', '88885572'),
(3, 'Carmen Gutierrez', '88885573'),
(3, 'Miguel Mora', '88885574'),
(3, 'Pablo Vargas', '88885575'),
(3, 'Lucia Porras', '88885576'),
(3, 'Diana Gomez', '88885577'),
(3, 'Manuel Soto', '88885578'),
(3, 'Claudia Jimenez', '88885579'),
(3, 'Rafael Alvarado', '88885580'),
(3, 'Antonio Ruiz', '88885581'),
(3, 'Andrea Martinez', '88885582'),
(3, 'Jose Lopez', '88885583'),
(3, 'Sandra Brenes', '88885584'),
(3, 'Daniel Rojas', '88885585');

INSERT INTO UserType (Name, Clearance)
VALUES 
('Admin', 1),
('Client', 2),
('Employee', 3),
('Manager', 4),
('General Manager', 5);

INSERT INTO ProductType (Name)
VALUES 
('Medicine'),
('Treatment'),
('Service'),
('Food'),
('Other');
 
INSERT INTO Product (IDProductType, Name, Description, Price)
VALUES 
(1, 'Aspirin 500mg', 'Pain reliever and anti-inflammatory medication', 1200.00),
(2, 'Annual Check-Up', 'Comprehensive health check-up for pets', 50000.00),
(3, 'Grooming Service', 'Complete grooming service including bath and haircut', 15000.00),
(4, 'Dog Food - Premium', 'High-quality dog food with essential nutrients', 25000.00),
(5, 'Pet Toys - Assorted', 'Pack of assorted toys for pets', 8000.00),
(1, 'Antibiotic Ointment', 'Topical antibiotic ointment for wound care', 1800.00),
(2, 'Vaccination Package', 'Complete vaccination package for puppies', 35000.00),
(3, 'Training Session', 'Professional pet training session', 40000.00),
(4, 'Cat Food - Premium', 'High-quality cat food with essential nutrients', 24000.00),
(5, 'Pet Bed - Large', 'Comfortable and durable pet bed for large pets', 35000.00),
(1, 'Ear Cleaner', 'Solution for cleaning pet ears', 1500.00),
(2, 'Dental Cleaning', 'Professional dental cleaning for pets', 45000.00),
(3, 'Pet Sitting', 'Pet sitting service for when you are away', 30000.00),
(4, 'Bird Food - Variety Pack', 'Variety pack of bird food', 15000.00),
(5, 'Fish Tank - 10 Gallons', 'Glass fish tank with accessories', 20000.00),
(1, 'Flea Shampoo', 'Shampoo for treating fleas in pets', 2200.00),
(2, 'Neutering Service', 'Professional neutering service for pets', 60000.00),
(3, 'Pet Walking', 'Daily pet walking service', 10000.00),
(4, 'Reptile Food - Mixed', 'Mixed food for reptiles', 18000.00),
(5, 'Pet Carrier - Medium', 'Medium-sized pet carrier for travel', 28000.00);


INSERT INTO Store (Location)
VALUES 
('San Jose'),
('Alajuela'),
('Cartago'),
('Heredia'),
('Guanacaste'),
('Puntarenas'),
('Limon'),
('Perez Zeledon'),
('San Carlos'),
('Liberia'),
('Nicoya'),
('Santa Cruz'),
('Escazu'),
('Santa Ana'),
('Curridabat'),
('Desamparados'),
('Montes de Oca'),
('Moravia'),
('Tibas'),
('Goicoechea');

INSERT INTO Inventory (IDProduct, IDStore, Quantity)
VALUES 
(1, 1, 10),
(2, 2, 20),
(3, 3, 30),
(4, 4, 40),
(5, 5, 50),
(6, 6, 60),
(7, 7, 70),
(8, 8, 80),
(9, 9, 90),
(10, 10, 100),
(11, 11, 110),
(12, 12, 120),
(13, 13, 130),
(14, 14, 140),
(15, 15, 150),
(16, 16, 160),
(17, 17, 170),
(18, 18, 180),
(19, 19, 190),
(20, 20, 200);

INSERT INTO Review (IDProduct, IDClient, Description, Rating, DateTime)
VALUES 
(1, 1, 'Great product', 5, '2024-05-01 08:00:00'),
(2, 2, 'Good service', 4, '2024-05-02 09:15:00'),
(3, 3, 'Not bad', 3, '2024-05-03 10:30:00'),
(4, 4, 'Could be better', 2, '2024-05-04 11:45:00'),
(5, 5, 'Terrible experience', 1, '2024-05-05 12:00:00'),
(6, 6, 'Very satisfied', 5, '2024-05-06 13:15:00'),
(7, 7, 'Nice quality', 4, '2024-05-07 14:30:00'),
(8, 8, 'Average', 3, '2024-05-08 15:45:00'),
(9, 9, 'Needs improvement', 2, '2024-05-09 16:00:00'),
(10, 10, 'Horrible', 1, '2024-05-10 17:15:00'),
(11, 11, 'Excellent', 5, '2024-05-11 18:30:00'),
(12, 12, 'Good value', 4, '2024-05-12 19:45:00'),
(13, 13, 'Okay', 3, '2024-05-13 20:00:00'),
(14, 14, 'Not worth it', 2, '2024-05-14 21:15:00'),
(15, 15, 'Worst ever', 1, '2024-05-15 22:30:00'),
(16, 16, 'Fantastic', 5, '2024-05-16 23:45:00'),
(17, 17, 'Good', 4, '2024-05-17 00:00:00'),
(18, 18, 'So-so', 3, '2024-05-18 01:15:00'),
(19, 19, 'Not impressed', 2, '2024-05-19 02:30:00'),
(20, 20, 'Awful', 1, '2024-05-20 03:45:00');

INSERT INTO PetType (Name)
VALUES 
('Dog'),
('Cat'),
('Bird'),
('Fish');

INSERT INTO Breed (IDPetType, Name)
VALUES 
(1, 'Labrador Retriever'),
(1, 'German Shepherd'),
(1, 'Golden Retriever'),
(1, 'Bulldog'),
(1, 'Poodle'),
(2, 'Siamese'),
(2, 'Persian'),
(2, 'Maine Coon'),
(2, 'Ragdoll'),
(2, 'Bengal'),
(3, 'Parakeet'),
(3, 'Canary'),
(3, 'Cockatiel'),
(3, 'Finch'),
(3, 'Lovebird'),
(4, 'Goldfish'),
(4, 'Betta'),
(4, 'Guppy'),
(4, 'Angelfish'),
(4, 'Tetra');

INSERT INTO Pet (IDBreed, IDClient, Name, Birthdate, Weight, Notes)
VALUES 
(1, 1, 'Buddy', '2020-01-01', 30, 'Friendly and energetic'),
(2, 2, 'Whiskers', '2019-05-12', 5, 'Loves to sleep'),
(3, 3, 'Tweety', '2021-03-14', 0.5, 'Sings beautifully'),
(4, 4, 'Goldie', '2022-07-23', 0.1, 'Swims gracefully'),
(5, 5, 'Spike', '2018-11-29', 2, 'Likes to bask in the sun'),
(6, 6, 'Nibbles', '2021-02-14', 0.3, 'Active and curious'),
(7, 7, 'Jumpy', '2020-08-20', 0.2, 'Loves to hop around'),
(8, 8, 'Flutter', '2019-09-10', 0.01, 'Colorful wings'),
(9, 9, 'Fang', '2018-12-01', 0.1, 'Very quiet'),
(10, 10, 'Shellie', '2020-05-15', 0.2, 'Slow but steady'),
(11, 11, 'Thumper', '2021-01-07', 4, 'Hops a lot'),
(12, 12, 'Lightning', '2019-06-25', 500, 'Fast runner'),
(13, 13, 'Daisy', '2018-03-30', 600, 'Gentle and calm'),
(14, 14, 'Billy', '2021-11-05', 50, 'Curious and playful'),
(15, 15, 'Woolly', '2020-04-19', 70, 'Soft and fluffy'),
(16, 16, 'Porky', '2019-12-10', 100, 'Loves to eat'),
(17, 17, 'Clucky', '2021-09-17', 2, 'Lays eggs'),
(18, 18, 'Fluffy', '2019-02-22', 6, 'Soft fur'),
(19, 19, 'Max', '2020-06-14', 35, 'Loyal and protective'),
(20, 20, 'Mystery', '2022-01-01', 0, 'Unknown breed');

INSERT INTO StatusType (Name)
VALUES 
('Pending'),
('Confirmed'),
('Completed'),
('Cancelled');

INSERT INTO Appointment (IDPet, IDEmployee, IDStore, IDStatus, DateTime)
VALUES 
(1, 1, 1, 1, '2024-06-01 08:00:00'),
(2, 2, 2, 2, '2024-06-02 09:15:00'),
(3, 3, 3, 3, '2024-06-03 10:30:00'),
(4, 4, 4, 4, '2024-06-04 11:45:00'),
(5, 5, 5, 1, '2024-06-05 12:00:00'),
(6, 6, 6, 2, '2024-06-06 13:15:00'),
(7, 7, 7, 3, '2024-06-07 14:30:00'),
(8, 8, 8, 4, '2024-06-08 15:45:00'),
(9, 9, 9, 1, '2024-06-09 16:00:00'),
(10, 10, 10, 2, '2024-06-10 17:15:00'),
(11, 11, 11, 3, '2024-06-11 18:30:00'),
(12, 12, 12, 4, '2024-06-12 19:45:00'),
(13, 13, 13, 1, '2024-06-13 20:00:00'),
(14, 14, 14, 2, '2024-06-14 21:15:00'),
(15, 15, 15, 3, '2024-06-15 22:30:00'),
(16, 16, 16, 4, '2024-06-16 23:45:00'),
(17, 17, 17, 1, '2024-06-17 00:00:00'),
(18, 18, 18, 2, '2024-06-18 01:15:00'),
(19, 19, 19, 3, '2024-06-19 02:30:00'),
(20, 20, 20, 4, '2024-06-20 03:45:00');

INSERT INTO PaymentType (Name)
VALUES 
('Credit Card'),
('Debit Card'),
('Cash'),
('SINPE');

INSERT INTO Payment (IDPaymentType, Name)
VALUES 
(1, 'Visa Credit Card'),
(2, 'MasterCard Debit Card'),
(3, 'Cash Payment'),
(4, 'SINPE Transfer'),
(1, 'American Express'),
(2, 'Visa Debit Card'),
(3, 'Cash Payment'),
(4, 'SINPE Transfer'),
(1, 'Discover Credit Card'),
(2, 'Maestro Debit Card'),
(3, 'Cash Payment'),
(4, 'SINPE Transfer'),
(1, 'Diners Club Credit Card'),
(2, 'Visa Debit Card'),
(3, 'Cash Payment'),
(4, 'SINPE Transfer'),
(1, 'JCB Credit Card'),
(2, 'Visa Debit Card');

INSERT INTO Invoice (IDAppointment, IDClient, IDPayment, IDStatus, DateTime)
VALUES 
(1, 1, 1, 1, '2024-06-01 08:00:00'),
(2, 2, 2, 2, '2024-06-02 09:15:00'),
(3, 3, 3, 3, '2024-06-03 10:30:00'),
(4, 4, 4, 4, '2024-06-04 11:45:00'),
(5, 5, 5, 1, '2024-06-05 12:00:00'),
(6, 6, 6, 2, '2024-06-06 13:15:00'),
(7, 7, 7, 3, '2024-06-07 14:30:00'),
(8, 8, 8, 4, '2024-06-08 15:45:00'),
(9, 9, 9, 1, '2024-06-09 16:00:00'),
(10, 10, 10, 2, '2024-06-10 17:15:00'),
(11, 11, 11, 3, '2024-06-11 18:30:00'),
(12, 12, 12, 4, '2024-06-12 19:45:00'),
(13, 13, 13, 1, '2024-06-13 20:00:00'),
(14, 14, 14, 2, '2024-06-14 21:15:00'),
(15, 15, 15, 3, '2024-06-15 22:30:00'),
(16, 16, 16, 4, '2024-06-16 23:45:00'),
(17, 17, 17, 1, '2024-06-17 00:00:00'),
(18, 18, 18, 2, '2024-06-18 01:15:00'),
(19, 19, 19, 3, '2024-06-19 02:30:00'),
(20, 20, 20, 4, '2024-06-20 03:45:00');

INSERT INTO InvoiceDetail (IDInvoice, IDProduct, Description, Quantity, Price)
VALUES 
(1, 1, 'Aspirin 500mg for pain relief', 2, 1200.00),
(2, 2, 'Annual check-up including vaccination and examination', 1, 50000.00),
(3, 3, 'Complete grooming service for medium-sized dog', 1, 15000.00),
(4, 4, 'Premium dog food - 10kg bag', 1, 25000.00),
(5, 5, 'Assorted pack of pet toys', 1, 8000.00),
(6, 6, 'Antibiotic ointment for wound care', 1, 1800.00),
(7, 7, 'Vaccination package for puppies', 1, 35000.00),
(8, 8, 'Professional pet training session', 1, 40000.00),
(9, 9, 'Premium cat food - 5kg bag', 1, 24000.00),
(10, 10, 'Large pet bed for dogs', 1, 35000.00),
(11, 11, 'Ear cleaner solution for pets', 1, 1500.00),
(12, 12, 'Professional dental cleaning for pets', 1, 45000.00),
(13, 13, 'Pet sitting service for 3 days', 1, 30000.00),
(14, 14, 'Variety pack of bird food - 2kg', 1, 15000.00),
(15, 15, '10-gallon fish tank with accessories', 1, 20000.00),
(16, 16, 'Flea shampoo for dogs and cats', 1, 2200.00),
(17, 17, 'Neutering service for male cat', 1, 60000.00),
(18, 18, 'Daily pet walking service for a week', 7, 10000.00),
(19, 19, 'Mixed food for reptiles - 1kg', 1, 18000.00),
(20, 20, 'Medium-sized pet carrier for travel', 1, 28000.00);

INSERT INTO Address (IDClient, Province, City, District, ZIPCode, Description)
VALUES 
(1, 'San Jose', 'San Jose', 'Carmen', '10101', 'Near the park'),
(2, 'Alajuela', 'Alajuela', 'San Jose', '20101', 'Close to the airport'),
(3, 'Cartago', 'Cartago', 'Oriental', '30101', 'Near the basilica'),
(4, 'Heredia', 'Heredia', 'Heredia', '40101', 'Next to the university'),
(5, 'Guanacaste', 'Liberia', 'Liberia', '50101', 'Near the beach'),
(6, 'Puntarenas', 'Puntarenas', 'Puntarenas', '60101', 'Close to the pier'),
(7, 'Limon', 'Limon', 'Limon', '70101', 'Near the port'),
(8, 'San Jose', 'Escazu', 'Escazu', '10201', 'Near the mall'),
(9, 'San Jose', 'Desamparados', 'San Rafael', '10301', 'Close to the church'),
(10, 'San Jose', 'Curridabat', 'Curridabat', '10401', 'Next to the school'),
(11, 'San Jose', 'Santa Ana', 'Santa Ana', '10501', 'Near the clinic'),
(12, 'San Jose', 'Moravia', 'San Vicente', '10601', 'Close to the park'),
(13, 'San Jose', 'Montes de Oca', 'San Pedro', '10701', 'Next to the bank'),
(14, 'San Jose', 'Goicoechea', 'Guadalupe', '10801', 'Near the supermarket'),
(15, 'San Jose', 'Tibas', 'Leon XIII', '10901', 'Close to the stadium'),
(16, 'San Jose', 'Perez Zeledon', 'San Isidro', '11101', 'Near the river'),
(17, 'San Jose', 'Aserri', 'Aserri', '11201', 'Next to the plaza'),
(18, 'San Jose', 'Mora', 'Ciudad Colon', '11301', 'Close to the hospital'),
(19, 'San Jose', 'Puriscal', 'Santiago', '11401', 'Near the library'),
(20, 'San Jose', 'Tarrazú', 'San Marcos', '11501', 'Close to the university');

INSERT INTO Shipping (IDInvoice, IDAddress, IDStatus, TrackingID)
VALUES 
(1, 1, 1, 'TRK001'),
(2, 2, 2, 'TRK002'),
(3, 3, 3, 'TRK003'),
(4, 4, 4, 'TRK004'),
(5, 5, 1, 'TRK005'),
(6, 6, 2, 'TRK006'),
(7, 7, 3, 'TRK007'),
(8, 8, 4, 'TRK008'),
(9, 9, 1, 'TRK009'),
(10, 10, 2, 'TRK010'),
(11, 11, 3, 'TRK011'),
(12, 12, 4, 'TRK012'),
(13, 13, 1, 'TRK013'),
(14, 14, 2, 'TRK014'),
(15, 15, 3, 'TRK015'),
(16, 16, 4, 'TRK016'),
(17, 17, 1, 'TRK017'),
(18, 18, 2, 'TRK018'),
(19, 19, 3, 'TRK019'),
(20, 20, 4, 'TRK020');

INSERT INTO Cart (IDClient, IDProduct, Quantity)
VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 11),
(12, 12, 12),
(13, 13, 13),
(14, 14, 14),
(15, 15, 15),
(16, 16, 16),
(17, 17, 17),
(18, 18, 18),
(19, 19, 19),
(20, 20, 20);