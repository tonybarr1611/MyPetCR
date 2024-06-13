------------------ Payment Type ------------------

-- Create
CREATE PROCEDURE SPCreatePaymentType (@Name nvarchar(64))
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

-- Read all
CREATE PROCEDURE SPReadAllPaymentType
AS
BEGIN
    SELECT IDPaymentType, Name
    FROM PaymentType
END;
GO

-- Read By ID
CREATE PROCEDURE SPReadPaymentTypeByID (@IDPaymentType int)
AS
BEGIN
    SELECT IDPaymentType, Name
    FROM PaymentType
    WHERE IDPaymentType = @IDPaymentType;
END;
GO

-- Update by ID
CREATE PROCEDURE SPUpdatePaymentType (@IDPaymentType int, @NewName nvarchar(64))
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

-- Delete by ID
CREATE PROCEDURE SPDeletePaymentType (@IDPaymentType int)
AS
BEGIN
    DELETE FROM PaymentType
    WHERE IDPaymentType = @IDPaymentType;
END;
GO

------------------ Payment ------------------

-- Create
CREATE PROCEDURE SPCreatePayment (@IDPaymentType INT, @Name NVARCHAR(64))
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

-- Read all
CREATE PROCEDURE SPReadAllPayment
AS
BEGIN
    SELECT IDPayment, IDPaymentType, Name
    FROM Payment
END;
GO

-- Read by ID
CREATE PROCEDURE SPReadPaymentByID (@IDPayment int)
AS
BEGIN
    SELECT IDPayment, IDPaymentType, Name
    FROM Payment
    WHERE IDPayment = @IDPayment;
END;
GO

-- Update by ID
CREATE PROCEDURE SPUpdatePayment (@IDPayment int, @NewName nvarchar(64))
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

-- Delete by ID
CREATE PROCEDURE SPDeletePayment (@IDPayment int)
AS
BEGIN
    DELETE FROM Payment
    WHERE IDPayment = @IDPayment;
END;
GO

------------------ Status Type ------------------

-- Create
CREATE PROCEDURE SPCreateStatus (@Name nvarchar(64))
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

-- Read all
CREATE PROCEDURE SPReadAllStatus
AS
BEGIN
    SELECT IDStatus, Name FROM StatusType
END;
GO

-- Read By ID
CREATE PROCEDURE SPReadStatusByID (@IDStatus int)
AS
BEGIN
    SELECT IDStatus, Name
    FROM StatusType
    WHERE IDStatus = @IDStatus;
END;
GO

-- Update by ID
CREATE PROCEDURE SPUpdateStatus (@IDStatus int, @NewName nvarchar(64))
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

-- Delete by ID
CREATE PROCEDURE SPDeleteStatus (@IDStatus int)
AS
BEGIN
    DELETE FROM StatusType WHERE IDStatus = @IDStatus;
END;
GO

------------------ Invoice ------------------

-- Create
CREATE PROCEDURE SPCreateInvoice (@IDAppointment INT, @IDClient INT, @IDPayment INT, @IDStatus INT, @DateTime DATETIME)
AS
BEGIN
    INSERT INTO Invoice (IDAppointment, IDClient, IDPayment, IDStatus, DateTime)
    VALUES (@IDAppointment, @IDClient, @IDPayment, @IDStatus, @DateTime);
END;
GO

-- Read All
CREATE  PROCEDURE SPReadAllInvoices
AS
BEGIN
    SELECT IDInvoice, IDAppointment, IDClient, IDPayment, IDStatus, DateTime
    FROM Invoice
END;
GO

-- Read By ID
CREATE PROCEDURE SPReadInvoiceByID (@IDInvoice int)
AS
BEGIN
    SELECT IDInvoice, IDAppointment, IDClient, IDPayment, IDStatus, DateTime
    FROM Invoice
    WHERE IDInvoice = @IDInvoice;
END;
GO

-- Update by ID
CREATE PROCEDURE SPUpdateInvoice (@IDInvoice INT, @IDAppointment INT, @IDClient INT, @IDPayment INT, @IDStatus INT, @DateTime DATETIME)
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

-- Delete by ID
CREATE PROCEDURE SPDeleteInvoice (@IDInvoice INT)
AS
BEGIN
    DELETE FROM Invoice WHERE IDInvoice = @IDInvoice;
END;
GO

------------------ Invoice Detail ------------------

-- Create
CREATE PROCEDURE SPCreateInvoiceDetail (
    @IDInvoice INT,
    @IDProduct INT,
    @Description NVARCHAR(512),
    @Quantity INT,
    @Price MONEY
)
AS
BEGIN
    INSERT INTO InvoiceDetail (IDInvoice, IDProduct, Description, Quantity, Price)
    VALUES (@IDInvoice, @IDProduct, @Description, @Quantity, @Price);
END;
GO

-- Read All
CREATE PROCEDURE SPReadAllInvoicesDetails
AS
BEGIN
    SELECT IDInvoiceDetail, IDInvoice, IDProduct, Description, Quantity, Price
    FROM InvoiceDetail;
END;
GO

-- Read by ID
CREATE PROCEDURE SPReadInvoiceDetailByID (@IDInvoiceDetail INT)
AS
BEGIN
    SELECT IDInvoiceDetail, IDInvoice, IDProduct, Description, Quantity, Price
    FROM InvoiceDetail
    WHERE IDInvoiceDetail = @IDInvoiceDetail;
END;
GO

-- Update
CREATE PROCEDURE SPUpdateInvoiceDetail
(
    @IDInvoiceDetail INT,
    @IDInvoice INT,
    @IDProduct INT,
    @Description NVARCHAR(512),
    @Quantity INT,
    @Price MONEY
)
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

-- Delete
CREATE PROCEDURE SPDeleteInvoiceDetail (@IDInvoiceDetail INT)
AS
BEGIN
    DELETE FROM InvoiceDetail
    WHERE IDInvoiceDetail = @IDInvoiceDetail;
END;
GO

------------------ Pet Type ------------------

-- Create
CREATE PROCEDURE SPCreatePetType (@Name NVARCHAR(64))
AS
BEGIN
    INSERT INTO PetType (Name)
    VALUES (@Name);
END;

-- Read all
CREATE PROCEDURE SPReadAllPetTypes
AS
BEGIN
    SELECT IDPetType, Name
    FROM PetType;
END;
GO

-- Read by ID
CREATE PROCEDURE SPReadPetTypeById (@IDPetType int)
AS
BEGIN
    SELECT IDPetType, Name
    FROM PetType
    WHERE IDPetType = @IDPetType;
END;

-- Update
CREATE PROCEDURE SPUpdatePetType(@IDPetType INT, @NewName NVARCHAR(64))
AS
BEGIN
    UPDATE PetType
    SET Name = @NewName
    WHERE IDPetType = @IDPetType;
END;

-- Delete
CREATE PROCEDURE SPDeletePetType (@PetTypeID INT)
AS
BEGIN
    DELETE FROM PetType
    WHERE IDPetType = @PetTypeID;
END;

------------------ Pet ------------------

-- Create
CREATE PROCEDURE SPCreatePet (
    @IDBreed INT,
    @IDClient INT,
    @Name NVARCHAR(128),
    @Birthdate DATE,
    @Weight INT,
    @Notes NVARCHAR(512)
)
AS
BEGIN
    INSERT INTO Pet (IDBreed, IDClient, Name, Birthdate, Weight, Notes)
    VALUES (@IDBreed, @IDClient, @Name, @Birthdate, @Weight, @Notes);
END;
GO

-- Read all
CREATE PROCEDURE SPReadAllPets
AS
BEGIN
    SELECT IDPet, IDBreed, IDClient, Name, Birthdate, Weight, Notes
    FROM Pet;
END;
GO

-- Read by ID
CREATE PROCEDURE SPReadPetByID (@PetID INT)
AS
BEGIN
    SELECT IDPet, IDBreed, IDClient, Name, Birthdate, Weight, Notes
    FROM Pet
    WHERE IDPet = @PetID;
END;
GO

-- Update
CREATE PROCEDURE SPUpdatePet
(
    @PetID INT,
    @Name NVARCHAR(128),
    @Birthdate DATE,
    @Weight INT,
    @Notes NVARCHAR(512)
)
AS
BEGIN
    UPDATE Pet
    SET Name = @Name,
        Birthdate = @Birthdate,
        Weight = @Weight,
        Notes = @Notes
    WHERE IDPet = @PetID;
END;
GO

-- Delete
CREATE PROCEDURE SPDeletePet(@IDPet INT)
AS
BEGIN
    DELETE FROM Pet
    WHERE IDPet = @IDPet;
END;
GO

------------------ Breed ------------------
-- Create
CREATE PROCEDURE SPCreateBreed
    @IDPetType INT,
    @Name NVARCHAR(128)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PetType WHERE IDPetType = @IDPetType)
    BEGIN
        RAISERROR ('Invalid PetType ID', 16, 1);
        RETURN;
    END

    INSERT INTO Breed (IDPetType, Name)
    VALUES (@IDPetType, @Name);
END
GO

-- Read All
CREATE PROCEDURE SPReadAllBreeds
AS
BEGIN
    SELECT * FROM Breed;
END
GO

-- Read By ID
CREATE PROCEDURE SPReadBreedByID
    @IDBreed INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Breed WHERE IDBreed = @IDBreed)
    BEGIN
        RAISERROR ('Invalid Breed ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Breed WHERE IDBreed = @IDBreed;
END
GO

-- Update
CREATE PROCEDURE SPUpdateBreed
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
    SET IDPetType = @IDPetType, Name = @Name
    WHERE IDBreed = @IDBreed;
END
GO

-- Delete
CREATE PROCEDURE SPDeleteBreed
    @IDBreed INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Breed WHERE IDBreed = @IDBreed)
    BEGIN
        RAISERROR ('Invalid Breed ID', 16, 1);
        RETURN;
    END

    DELETE FROM Breed WHERE IDBreed = @IDBreed;
END
GO

------------------ Appointment ------------------

-- Create
CREATE PROCEDURE SPCreateAppointment
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
END
GO

-- Read All
CREATE PROCEDURE SPReadAllAppointments
AS
BEGIN
    SELECT * FROM Appointment;
END
GO

-- Read By ID
CREATE PROCEDURE SPReadAppointmentByID
    @IDAppointment INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Appointment WHERE IDAppointment = @IDAppointment)
    BEGIN
        RAISERROR ('Invalid Appointment ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Appointment WHERE IDAppointment = @IDAppointment;
END
GO

-- Update
CREATE PROCEDURE SPUpdateAppointment
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
    SET IDPet = @IDPet, IDEmployee = @IDEmployee, IDStore = @IDStore, IDStatus = @IDStatus, DateTime = @DateTime
    WHERE IDAppointment = @IDAppointment;
END
GO

-- Delete
CREATE PROCEDURE SPDeleteAppointment
    @IDAppointment INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Appointment WHERE IDAppointment = @IDAppointment)
    BEGIN
        RAISERROR ('Invalid Appointment ID', 16, 1);
        RETURN;
    END

    DELETE FROM Appointment WHERE IDAppointment = @IDAppointment;
END
GO

------------------ Address ------------------

-- Create
CREATE PROCEDURE SPCreateAddress
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
END
GO

-- Read All
CREATE PROCEDURE SPReadAllAddresses
AS
BEGIN
    SELECT * FROM Address;
END
GO

-- Read By ID
CREATE PROCEDURE SPReadAddressByID
    @IDAddress INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Address WHERE IDAddress = @IDAddress;
END
GO

-- Update
CREATE PROCEDURE SPUpdateAddress
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
    SET IDClient = @IDClient, Province = @Province, City = @City, District = @District, ZIPCode = @ZIPCode, Description = @Description
    WHERE IDAddress = @IDAddress;
END
GO

-- Delete
CREATE PROCEDURE SPDeleteAddress
    @IDAddress INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Address WHERE IDAddress = @IDAddress)
    BEGIN
        RAISERROR ('Invalid Address ID', 16, 1);
        RETURN;
    END

    DELETE FROM Address WHERE IDAddress = @IDAddress;
END
GO

------------------ Shipping ------------------

-- Create
CREATE PROCEDURE SPCreateShipping
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
END
GO

-- Read All
CREATE PROCEDURE SPReadAllShippings
AS
BEGIN
    SELECT * FROM Shipping;
END
GO

-- Read By ID
CREATE PROCEDURE SPReadShippingByID
    @IDShipping INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Shipping WHERE IDShipping = @IDShipping)
    BEGIN
        RAISERROR ('Invalid Shipping ID', 16, 1);
        RETURN;
    END

    SELECT * FROM Shipping WHERE IDShipping = @IDShipping;
END
GO

-- Update
CREATE PROCEDURE SPUpdateShipping
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
    SET IDInvoice = @IDInvoice, IDAddress = @IDAddress, IDStatus = @IDStatus, TrackingID = @TrackingID
    WHERE IDShipping = @IDShipping;
END
GO

-- Delete
CREATE PROCEDURE SPDeleteShipping
    @IDShipping INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Shipping WHERE IDShipping = @IDShipping)
    BEGIN
        RAISERROR ('Invalid Shipping ID', 16, 1);
        RETURN;
    END

    DELETE FROM Shipping WHERE IDShipping = @IDShipping;
END
GO