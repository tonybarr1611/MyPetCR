-------------------------------Address-------------------------------

-- Create
CREATE PROCEDURE CreateAddress
    @IDClient INT,
    @Province NVARCHAR(16),
    @City NVARCHAR(64),
    @District NVARCHAR(64),
    @ZIPCode NVARCHAR(10),
    @Description NVARCHAR(512)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Client WHERE IDClient = @IDClient)
    BEGIN
        RAISERROR ('Invalid Client ID', 16, 1);
        RETURN;
    END

    INSERT INTO Address (IDClient, Province, City, District, ZIPCode, Description)
    VALUES (@IDClient, @Province, @City, @District, @ZIPCode, @Description);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllAddresses
AS
BEGIN
    SELECT * FROM Address;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDAddress
    @IDAddress INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Address WHERE IDAddress = @IDAddress;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateAddress
    @IDAddress INT,
    @IDClient INT,
    @Province NVARCHAR(16),
    @City NVARCHAR(64),
    @District NVARCHAR(64),
    @ZIPCode NVARCHAR(10),
    @Description NVARCHAR(512)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Client WHERE IDClient = @IDClient)
    BEGIN
        RAISERROR ('Invalid Client ID', 16, 1);
        RETURN;
    END

    UPDATE Address
    SET IDClient = @IDClient,
        Province = @Province,
        City = @City,
        District = @District,
        ZIPCode = @ZIPCode,
        Description = @Description
    WHERE IDAddress = @IDAddress;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteAddress
    @IDAddress INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    DELETE FROM Address WHERE IDAddress = @IDAddress;
END;
GO

-------------------------------Appointment-------------------------------
-- Create
CREATE PROCEDURE CreateAppointment
    @IDPet INT,
    @IDEmployee INT,
    @IDStore INT,
    @IDStatus INT,
    @DateTime DATETIME
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pet WHERE IDPet = @IDPet)
    BEGIN
        RAISERROR ('Invalid Pet ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Employee WHERE IDEmployee = @IDEmployee)
    BEGIN
        RAISERROR ('Invalid Employee ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Store WHERE IDStore = @IDStore)
    BEGIN
        RAISERROR ('Invalid Store ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM StatusType WHERE IDStatus = @IDStatus)
    BEGIN
        RAISERROR ('Invalid Status ID', 16, 1);
        RETURN;
    END

    INSERT INTO Appointment (IDPet, IDEmployee, IDStore, IDStatus, DateTime)
    VALUES (@IDPet, @IDEmployee, @IDStore, @IDStatus, @DateTime);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllAppointments
AS
BEGIN
    SELECT * FROM Appointment;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDAppointment
    @IDAppointment INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Appointment WHERE IDAppointment = @IDAppointment)
    BEGIN
        RAISERROR ('Invalid Appointment ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Appointment WHERE IDAppointment = @IDAppointment;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateAppointment
    @IDAppointment INT,
    @IDPet INT,
    @IDEmployee INT,
    @IDStore INT,
    @IDStatus INT,
    @DateTime DATETIME
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Appointment WHERE IDAppointment = @IDAppointment)
    BEGIN
        RAISERROR ('Invalid Appointment ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Pet WHERE IDPet = @IDPet)
    BEGIN
        RAISERROR ('Invalid Pet ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Employee WHERE IDEmployee = @IDEmployee)
    BEGIN
        RAISERROR ('Invalid Employee ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Store WHERE IDStore = @IDStore)
    BEGIN
        RAISERROR ('Invalid Store ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM StatusType WHERE IDStatus = @IDStatus)
    BEGIN
        RAISERROR ('Invalid Status ID', 16, 1);
        RETURN;
    END

    UPDATE Appointment
    SET IDPet = @IDPet,
        IDEmployee = @IDEmployee,
        IDStore = @IDStore,
        IDStatus = @IDStatus,
        DateTime = @DateTime
    WHERE IDAppointment = @IDAppointment;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteAppointment
    @IDAppointment INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Appointment WHERE IDAppointment = @IDAppointment)
    BEGIN
        RAISERROR ('Invalid Appointment ID', 16, 1);
        RETURN;
    END

    DELETE FROM Appointment WHERE IDAppointment = @IDAppointment;
END;
GO

-------------------------------Breed-------------------------------

-- Create
CREATE PROCEDURE CreateBreed
    @IDPetType INT,
    @Name NVARCHAR(128)
AS
BEGIN
    INSERT INTO Breed (IDPetType, Name)
    VALUES (@IDPetType, @Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllBreeds
AS
BEGIN
    SELECT IDBreed, IDPetType, Name  FROM Breed;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDBreed
    @IDBreed INT
AS
BEGIN
    SELECT IDBreed, IDPetType, Name 
    FROM Breed 
    WHERE IDBreed = @IDBreed;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateBreed
    @IDBreed INT,
    @IDPetType INT,
    @Name NVARCHAR(128)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Breed WHERE IDBreed = @IDBreed)
    BEGIN
        RAISERROR ('Invalid Breed ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM PetType WHERE IDPetType = @IDPetType)
    BEGIN
        RAISERROR ('Invalid PetType ID', 16, 1);
        RETURN;
    END

    UPDATE Breed
    SET IDPetType = @IDPetType,
        Name = @Name
    WHERE IDBreed = @IDBreed;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteBreed
    @IDBreed INT
AS
BEGIN
    DELETE FROM Breed WHERE IDBreed = @IDBreed;
END;
GO

-------------------------------Client-------------------------------

-- Create
CREATE PROCEDURE CreateClient
    @Name NVARCHAR(255),
    @PhoneNumber NVARCHAR(20),
    @IDUser INT
AS
BEGIN
    INSERT INTO Client (Name, PhoneNumber, IDUser)
    VALUES (@Name, @PhoneNumber, @IDUser);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllClients
AS
BEGIN
    SELECT IDClient, Name, PhoneNumber, IDUser
    FROM Client;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDClient
    @IDClient INT
AS
BEGIN
    SELECT IDClient, Name, PhoneNumber, IDUser
    FROM Client
    WHERE IDClient = @IDClient;
END;
GO

-- Update
CREATE PROCEDURE UpdateClient
    @IDClient INT,
    @Name NVARCHAR(255),
    @PhoneNumber NVARCHAR(20),
    @IDUser INT
AS
BEGIN
    UPDATE Client
    SET Name = @Name,
        PhoneNumber = @PhoneNumber,
        IDUser = @IDUser
    WHERE IDClient = @IDClient;
END;
GO

-- Delete
CREATE PROCEDURE DeleteClient
    @IDClient INT
AS
BEGIN
    DELETE FROM Client
    WHERE IDClient = @IDClient;
END;
GO

-------------------------------Employee-------------------------------

-- Create
CREATE PROCEDURE CreateEmployee
    @IDUser INT,
    @Name NVARCHAR(255),
    @PhoneNumber NVARCHAR(20)
AS
BEGIN
    INSERT INTO Employee (IDUser, Name, PhoneNumber)
    VALUES (@IDUser, @Name, @PhoneNumber);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllEmployees
AS
BEGIN
    SELECT IDEmployee, IDUser, Name, PhoneNumber
    FROM Employee;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDEmployee
    @IDEmployee INT
AS
BEGIN
    SELECT IDEmployee, IDUser, Name, PhoneNumber
    FROM Employee
    WHERE IDEmployee = @IDEmployee;
END;
GO

-- Update
CREATE PROCEDURE UpdateEmployee
    @IDEmployee INT,
    @IDUser INT,
    @Name NVARCHAR(255),
    @PhoneNumber NVARCHAR(20)
AS
BEGIN
    UPDATE Employee
    SET IDUser = @IDUser,
        Name = @Name,
        PhoneNumber = @PhoneNumber
    WHERE IDEmployee = @IDEmployee;
END;
GO


-- Delete
CREATE PROCEDURE DeleteEmployee
    @IDEmployee INT
AS
BEGIN
    DELETE FROM Employee
    WHERE IDEmployee = @IDEmployee;
END;
GO

-------------------------------Inventory-------------------------------

-- Create
CREATE PROCEDURE CreateInventory
    @IDProduct INT,
    @IDStore INT,
    @Quantity INT
AS
BEGIN
    INSERT INTO Inventory (IDProduct, IDStore, Quantity)
    VALUES (@IDProduct, @IDStore, @Quantity);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllInventories
AS
BEGIN
    SELECT IDProduct, IDStore, Quantity
    FROM Inventory;
END;
GO

-- Read By Product And Store
CREATE PROCEDURE ReadInventoryByProductAndStore
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    SELECT IDProduct, IDStore, Quantity
    FROM Inventory
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END;
GO

-- Update
CREATE PROCEDURE UpdateInventory
    @IDProduct INT,
    @IDStore INT,
    @Quantity INT
AS
BEGIN
    UPDATE Inventory
    SET Quantity = @Quantity
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END;
GO

-- Delete
CREATE PROCEDURE DeleteInventory
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    DELETE FROM Inventory
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END;
GO

-------------------------------Invoice-------------------------------

-- Create
CREATE PROCEDURE CreateInvoice
    @IDAppointment INT,
    @IDClient INT,
    @IDPayment INT,
    @IDStatus INT,
    @DateTime DATETIME
AS
BEGIN
    INSERT INTO Invoice (IDAppointment, IDClient, IDPayment, IDStatus, DateTime)
    VALUES (@IDAppointment, @IDClient, @IDPayment, @IDStatus, @DateTime);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllInvoices
AS
BEGIN
    SELECT IDInvoice, IDAppointment, IDClient, IDPayment, IDStatus, DateTime
    FROM Invoice;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDInvoice
    @IDInvoice INT
AS
BEGIN
    SELECT IDInvoice, IDAppointment, IDClient, IDPayment, IDStatus, DateTime
    FROM Invoice
    WHERE IDInvoice = @IDInvoice;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateInvoice
    @IDInvoice INT,
    @IDAppointment INT,
    @IDClient INT,
    @IDPayment INT,
    @IDStatus INT,
    @DateTime DATETIME
AS
BEGIN
    UPDATE Invoice
    SET IDAppointment = @IDAppointment,
        IDClient = @IDClient,
        IDPayment = @IDPayment,
        IDStatus = @IDStatus,
        DateTime = @DateTime
    WHERE IDInvoice = @IDInvoice;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteInvoice
    @IDInvoice INT
AS
BEGIN
    DELETE FROM Invoice WHERE IDInvoice = @IDInvoice;
END;
GO

-------------------------------InvoiceDetail-------------------------------

-- Create
CREATE PROCEDURE CreateInvoiceDetail
    @IDInvoice INT,
    @IDProduct INT,
    @Description NVARCHAR(512),
    @Quantity INT,
    @Price MONEY
AS
BEGIN
    INSERT INTO InvoiceDetail (IDInvoice, IDProduct, Description, Quantity, Price)
    VALUES (@IDInvoice, @IDProduct, @Description, @Quantity, @Price);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllInvoiceDetails
AS
BEGIN
    SELECT IDInvoiceDetail, IDInvoice, IDProduct, Description, Quantity, Price
    FROM InvoiceDetail;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDInvoiceDetail
    @IDInvoiceDetail INT
AS
BEGIN
    SELECT IDInvoiceDetail, IDInvoice, IDProduct, Description, Quantity, Price
    FROM InvoiceDetail
    WHERE IDInvoiceDetail = @IDInvoiceDetail;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateInvoiceDetail
    @IDInvoiceDetail INT,
    @IDInvoice INT,
    @IDProduct INT,
    @Description NVARCHAR(512),
    @Quantity INT,
    @Price MONEY
AS
BEGIN
    UPDATE InvoiceDetail
    SET IDInvoice = @IDInvoice,
        IDProduct = @IDProduct,
        Description = @Description,
        Quantity = @Quantity,
        Price = @Price
    WHERE IDInvoiceDetail = @IDInvoiceDetail;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteInvoiceDetail
    @IDInvoiceDetail INT
AS
BEGIN
    DELETE FROM InvoiceDetail
    WHERE IDInvoiceDetail = @IDInvoiceDetail;
END;
GO

-------------------------------Log-------------------------------

-- Create
CREATE PROCEDURE CreateLog
    @IDLogType INT,
    @IDUser INT,
    @DateTime DATETIME,
    @Description NVARCHAR(255)
AS
BEGIN
    INSERT INTO Log (IDLogType, IDUser, DateTime, Description)
    VALUES (@IDLogType, @IDUser, @DateTime, @Description);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllLogs
AS
BEGIN
    SELECT IDLog, IDLogType, IDUser, DateTime, Description
    FROM Log;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDLog
    @IDLog INT
AS
BEGIN
    SELECT IDLog, IDLogType, IDUser, DateTime, Description
    FROM Log
    WHERE IDLog = @IDLog;
END;
GO

-- Update
CREATE PROCEDURE UpdateLog
    @IDLog INT,
    @IDLogType INT,
    @IDUser INT,
    @DateTime DATETIME,
    @Description NVARCHAR(255)
AS
BEGIN
    UPDATE Log
    SET IDLogType = @IDLogType,
        IDUser = @IDUser,
        DateTime = @DateTime,
        Description = @Description
    WHERE IDLog = @IDLog;
END;
GO

-- Delete
CREATE PROCEDURE DeleteLog
    @IDLog INT
AS
BEGIN
    DELETE FROM Log
    WHERE IDLog = @IDLog;
END;
GO

-------------------------------LogType-------------------------------

-- Create
CREATE PROCEDURE CreateLogType
    @Name NVARCHAR(255)
AS
BEGIN
    INSERT INTO LogType (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllLogTypes
AS
BEGIN
    SELECT IDLogType, Name
    FROM LogType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDLogType
    @IDLogType INT
AS
BEGIN
    SELECT IDLogType, Name
    FROM LogType
    WHERE IDLogType = @IDLogType;
END;
GO

-- Update
CREATE PROCEDURE UpdateLogType
    @IDLogType INT,
    @Name NVARCHAR(255)
AS
BEGIN
    UPDATE LogType
    SET Name = @Name
    WHERE IDLogType = @IDLogType;
END;
GO

-- Delete
CREATE PROCEDURE DeleteLogType
    @IDLogType INT
AS
BEGIN
    DELETE FROM LogType
    WHERE IDLogType = @IDLogType;
END;
GO

-------------------------------Payment-------------------------------

-- Create
CREATE PROCEDURE CreatePayment
    @IDPaymentType INT,
    @Name NVARCHAR(64)
AS
BEGIN
    IF @Name IS NULL OR @Name = ''
    BEGIN
        RAISERROR ('Payment name cannot be empty.', 16, 1);
        RETURN;
    END;

    INSERT INTO Payment (IDPaymentType, Name)
    VALUES (@IDPaymentType, @Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllPayments
AS
BEGIN
    SELECT IDPayment, IDPaymentType, Name
    FROM Payment;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPayment
    @IDPayment INT
AS
BEGIN
    SELECT IDPayment, IDPaymentType, Name
    FROM Payment
    WHERE IDPayment = @IDPayment;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdatePayment
    @IDPayment INT,
    @NewName NVARCHAR(64)
AS
BEGIN
    IF @NewName IS NULL OR @NewName = ''
    BEGIN
        RAISERROR ('Payment new name cannot be empty.', 16, 1);
        RETURN;
    END;

    UPDATE Payment
    SET Name = @NewName
    WHERE IDPayment = @IDPayment;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeletePayment
    @IDPayment INT
AS
BEGIN
    DELETE FROM Payment
    WHERE IDPayment = @IDPayment;
END;
GO

-------------------------------PaymentType-------------------------------

-- Create
CREATE PROCEDURE CreatePaymentType
    @Name NVARCHAR(64)
AS
BEGIN
    IF @Name IS NULL OR @Name = ''
    BEGIN
        RAISERROR ('Payment type name cannot be empty.', 16, 1);
        RETURN;
    END;

    INSERT INTO PaymentType (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllPaymentTypes
AS
BEGIN
    SELECT IDPaymentType, Name
    FROM PaymentType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPaymentType
    @IDPaymentType INT
AS
BEGIN
    SELECT IDPaymentType, Name
    FROM PaymentType
    WHERE IDPaymentType = @IDPaymentType;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdatePaymentType
    @IDPaymentType INT,
    @NewName NVARCHAR(64)
AS
BEGIN
    IF @NewName IS NULL OR @NewName = ''
    BEGIN
        RAISERROR ('Payment type new name cannot be empty.', 16, 1);
        RETURN;
    END;

    UPDATE PaymentType
    SET Name = @NewName
    WHERE IDPaymentType = @IDPaymentType;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeletePaymentType
    @IDPaymentType INT
AS
BEGIN
    DELETE FROM PaymentType
    WHERE IDPaymentType = @IDPaymentType;
END;
GO

-------------------------------Pet-------------------------------

-- Create
CREATE PROCEDURE CreatePet
    @IDBreed INT,
    @IDClient INT,
    @Name NVARCHAR(128),
    @Birthdate DATE,
    @Weight INT,
    @Notes NVARCHAR(512)
AS
BEGIN
    INSERT INTO Pet (IDBreed, IDClient, Name, Birthdate, Weight, Notes)
    VALUES (@IDBreed, @IDClient, @Name, @Birthdate, @Weight, @Notes);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllPets
AS
BEGIN
    SELECT IDPet, IDBreed, IDClient, Name, Birthdate, Weight, Notes
    FROM Pet;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPet
    @IDPet INT
AS
BEGIN
    SELECT IDPet, IDBreed, IDClient, Name, Birthdate, Weight, Notes
    FROM Pet
    WHERE IDPet = @IDPet;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdatePet
    @IDPet INT,
    @IDBreed INT,
    @IDClient INT,
    @Name NVARCHAR(128),
    @Birthdate DATE,
    @Weight INT,
    @Notes NVARCHAR(512)
AS
BEGIN
    UPDATE Pet
    SET IDBreed = @IDBreed,
        IDClient = @IDClient,
        Name = @Name,
        Birthdate = @Birthdate,
        Weight = @Weight,
        Notes = @Notes
    WHERE IDPet = @IDPet;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeletePet
    @IDPet INT
AS
BEGIN
    DELETE FROM Pet
    WHERE IDPet = @IDPet;
END;
GO

-------------------------------PetType-------------------------------

-- Create
CREATE PROCEDURE CreatePetType
    @Name NVARCHAR(64)
AS
BEGIN
    INSERT INTO PetType (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllPetTypes
AS
BEGIN
    SELECT IDPetType, Name
    FROM PetType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPetType
    @IDPetType INT
AS
BEGIN
    SELECT IDPetType, Name
    FROM PetType
    WHERE IDPetType = @IDPetType;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdatePetType
    @IDPetType INT,
    @NewName NVARCHAR(64)
AS
BEGIN
    UPDATE PetType
    SET Name = @NewName
    WHERE IDPetType = @IDPetType;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeletePetType
    @IDPetType INT
AS
BEGIN
    DELETE FROM PetType
    WHERE IDPetType = @IDPetType;
END;
GO

-------------------------------Product-------------------------------

-- Create
CREATE PROCEDURE CreateProduct
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY
AS
BEGIN
    INSERT INTO Product (IDProductType, Name, Description, Price)
    VALUES (@IDProductType, @Name, @Description, @Price);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllProducts
AS
BEGIN
    SELECT IDProduct, IDProductType, Name, Description, Price
    FROM Product;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDProduct
    @IDProduct INT
AS
BEGIN
    SELECT IDProduct, IDProductType, Name, Description, Price
    FROM Product
    WHERE IDProduct = @IDProduct;
END;
GO

-- Update
CREATE PROCEDURE UpdateProduct
    @IDProduct INT,
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY
AS
BEGIN
    UPDATE Product
    SET IDProductType = @IDProductType,
        Name = @Name,
        Description = @Description,
        Price = @Price
    WHERE IDProduct = @IDProduct;
END;
GO

-- Delete
CREATE PROCEDURE DeleteProduct
    @IDProduct INT
AS
BEGIN
    DELETE FROM Product
    WHERE IDProduct = @IDProduct;
END;
GO

-------------------------------ProductType-------------------------------

-- Create
CREATE PROCEDURE CreateProductType
    @Name NVARCHAR(255)
AS
BEGIN
    INSERT INTO ProductType (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllProductTypes
AS
BEGIN
    SELECT IDProductType, Name
    FROM ProductType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDProductType
    @IDProductType INT
AS
BEGIN
    SELECT IDProductType, Name
    FROM ProductType
    WHERE IDProductType = @IDProductType;
END;
GO

-- Update
CREATE PROCEDURE UpdateProductType
    @IDProductType INT,
    @Name NVARCHAR(255)
AS
BEGIN
    UPDATE ProductType
    SET Name = @Name
    WHERE IDProductType = @IDProductType;
END;
GO

-- Delete
CREATE PROCEDURE DeleteProductType
    @IDProductType INT
AS
BEGIN
    DELETE FROM ProductType
    WHERE IDProductType = @IDProductType;
END;
GO

-------------------------------Review-------------------------------

-- Create
CREATE PROCEDURE CreateReview
    @IDProduct INT,
    @IDClient INT,
    @Description NVARCHAR(512),
    @Rating TINYINT,
    @DateTime DATETIME
AS
BEGIN
    INSERT INTO Review (IDProduct, IDClient, Description, Rating, DateTime)
    VALUES (@IDProduct, @IDClient, @Description, @Rating, @DateTime);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllReviews
AS
BEGIN
    SELECT IDReview, IDProduct, IDClient, Description, Rating, DateTime
    FROM Review;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDReview
    @IDReview INT
AS
BEGIN
    SELECT IDReview, IDProduct, IDClient, Description, Rating, DateTime
    FROM Review
    WHERE IDReview = @IDReview;
END;
GO

-- Update
CREATE PROCEDURE UpdateReview
    @IDReview INT,
    @IDProduct INT,
    @IDClient INT,
    @Description NVARCHAR(512),
    @Rating TINYINT,
    @DateTime DATETIME
AS
BEGIN
    UPDATE Review
    SET IDProduct = @IDProduct,
        IDClient = @IDClient,
        Description = @Description,
        Rating = @Rating,
        DateTime = @DateTime
    WHERE IDReview = @IDReview;
END;
GO

-- Delete
CREATE PROCEDURE DeleteReview
    @IDReview INT
AS
BEGIN
    DELETE FROM Review
    WHERE IDReview = @IDReview;
END;
GO

-------------------------------Shipping-------------------------------

-- Create
CREATE PROCEDURE CreateShipping
    @IDInvoice INT,
    @IDAddress INT,
    @IDStatus INT,
    @TrackingID NVARCHAR(128)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Invoice WHERE IDInvoice = @IDInvoice)
    BEGIN
        RAISERROR ('Invalid Invoice ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM StatusType WHERE IDStatus = @IDStatus)
    BEGIN
        RAISERROR ('Invalid Status ID', 16, 1);
        RETURN;
    END

    INSERT INTO Shipping (IDInvoice, IDAddress, IDStatus, TrackingID)
    VALUES (@IDInvoice, @IDAddress, @IDStatus, @TrackingID);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllShippings
AS
BEGIN
    SELECT * FROM Shipping;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDShipping
    @IDShipping INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Shipping WHERE IDShipping = @IDShipping)
    BEGIN
        RAISERROR ('Invalid Shipping ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Shipping WHERE IDShipping = @IDShipping;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateShipping
    @IDShipping INT,
    @IDInvoice INT,
    @IDAddress INT,
    @IDStatus INT,
    @TrackingID NVARCHAR(128)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Shipping WHERE IDShipping = @IDShipping)
    BEGIN
        RAISERROR ('Invalid Shipping ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Invoice WHERE IDInvoice = @IDInvoice)
    BEGIN
        RAISERROR ('Invalid Invoice ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM StatusType WHERE IDStatus = @IDStatus)
    BEGIN
        RAISERROR ('Invalid Status ID', 16, 1);
        RETURN;
    END

    UPDATE Shipping
    SET IDInvoice = @IDInvoice,
        IDAddress = @IDAddress,
        IDStatus = @IDStatus,
        TrackingID = @TrackingID
    WHERE IDShipping = @IDShipping;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteShipping
    @IDShipping INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Shipping WHERE IDShipping = @IDShipping)
    BEGIN
        RAISERROR ('Invalid Shipping ID', 16, 1);
        RETURN;
    END

    DELETE FROM Shipping WHERE IDShipping = @IDShipping;
END;
GO

-------------------------------StatusType-------------------------------

-- Create
CREATE PROCEDURE CreateStatus
    @Name NVARCHAR(64)
AS
BEGIN
    IF @Name IS NULL OR @Name = ''
    BEGIN
        RAISERROR ('Status name cannot be empty.', 16, 1);
        RETURN;
    END;

    INSERT INTO StatusType (Name) VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllStatuses
AS
BEGIN
    SELECT IDStatus, Name FROM StatusType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDStatus
    @IDStatus INT
AS
BEGIN
    SELECT IDStatus, Name
    FROM StatusType
    WHERE IDStatus = @IDStatus;
END;
GO

-- Update By ID
CREATE PROCEDURE UpdateStatus
    @IDStatus INT,
    @NewName NVARCHAR(64)
AS
BEGIN
    IF @NewName IS NULL OR @NewName = ''
    BEGIN
        RAISERROR ('Status new name cannot be empty.', 16, 1);
        RETURN;
    END;

    UPDATE StatusType
    SET Name = @NewName
    WHERE IDStatus = @IDStatus;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteStatus
    @IDStatus INT
AS
BEGIN
    DELETE FROM StatusType WHERE IDStatus = @IDStatus;
END;
GO

-------------------------------Store-------------------------------

-- Create
CREATE PROCEDURE CreateStore
    @Location NVARCHAR(128)
AS
BEGIN
    INSERT INTO Store (Location)
    VALUES (@Location);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllStores
AS
BEGIN
    SELECT IDStore, Location
    FROM Store;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDStore
    @IDStore INT
AS
BEGIN
    SELECT IDStore, Location
    FROM Store
    WHERE IDStore = @IDStore;
END;
GO

-- Update
CREATE PROCEDURE UpdateStore
    @IDStore INT,
    @Location NVARCHAR(128)
AS
BEGIN
    UPDATE Store
    SET Location = @Location
    WHERE IDStore = @IDStore;
END;
GO

-- Delete
CREATE PROCEDURE DeleteStore
    @IDStore INT
AS
BEGIN
    DELETE FROM Store
    WHERE IDStore = @IDStore;
END;
GO

-------------------------------User-------------------------------

-- Create
CREATE PROCEDURE CreateUser
    @LoginID NVARCHAR(255),
    @Password NVARCHAR(255),
    @IDUserType INT
AS
BEGIN
    INSERT INTO [User] (LoginID, Password, IDUserType)
    VALUES (@LoginID, @Password, @IDUserType);
END;
GO


-- Read All
CREATE PROCEDURE ReadAllUsers
AS
BEGIN
    SELECT IDUser, LoginID, IDUserType
    FROM [User];
END;
GO


-- Read By ID
CREATE PROCEDURE ReadByIDUser
    @IDUser INT
AS
BEGIN
    SELECT IDUser, LoginID, IDUserType
    FROM [User]
    WHERE IDUser = @IDUser;
END;
GO

-- Read By Mail
CREATE PROCEDURE ReadUserByMail
    @LoginID NVARCHAR(225)
AS
BEGIN
    SELECT IDUser, LoginID, Password, IDUserType
    FROM [User]
    WHERE @LoginID = LoginID;
END;
GO

-- Update
CREATE PROCEDURE UpdateUser
    @IDUser INT,
    @LoginID NVARCHAR(225),
    @NewPassword NVARCHAR(255),
    @IDUserType INT
AS
BEGIN
    UPDATE [User]
    SET Password = @NewPassword,
        LoginID = @LoginID,
        IDUserType = @IDUserType
    WHERE IDUser = @IDUser;
END;
GO

-- Delete
CREATE PROCEDURE DeleteUser
    @IDUser INT
AS
BEGIN
    DELETE FROM [User]
    WHERE IDUser = @IDUser;
END;
GO


-------------------------------UserType-------------------------------

-- Create
CREATE PROCEDURE CreateUserType
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    INSERT INTO UserType (Name, Clearance)
    VALUES (@Name, @Clearance);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllUserTypes
AS
BEGIN
    SELECT IDUserType, Name, Clearance
    FROM UserType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDUserType
    @IDUserType INT
AS
BEGIN
    SELECT IDUserType, Name, Clearance
    FROM UserType
    WHERE IDUserType = @IDUserType;
END;
GO

-- Update
CREATE PROCEDURE UpdateUserType
    @IDUserType INT,
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    UPDATE UserType
    SET Name = @Name,
        Clearance = @Clearance
    WHERE IDUserType = @IDUserType;
END;
GO

-- Delete
CREATE PROCEDURE DeleteUserType
    @IDUserType INT
AS
BEGIN
    DELETE FROM UserType
    WHERE IDUserType = @IDUserType;
END;
GO
