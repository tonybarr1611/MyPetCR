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
    SELECT A.IDAddress, A.IDClient, A.Province, A.City, A.District, A.ZIPCode, A.Description,
           C.IDUser , C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Address A
    LEFT JOIN Client C on C.IDClient = A.IDClient;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDAddress
    @IDClient INT
AS
BEGIN
    SELECT A.IDAddress, A.IDClient, A.Province, A.City, A.District, A.ZIPCode, A.Description,
           C.IDUser , C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Address A
    LEFT JOIN Client C on C.IDClient = A.IDClient
    WHERE A.IDAddress = @IDClient;
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
    SELECT A.IDAppointment, A.DateTime,
           A.IDPet, P.IDBreed, P.IDClient, P.Name 'PetName', P.Birthdate 'PetBirthdate', P.Weight 'PetWeight', P.Notes 'PetNotes',
           C.Name 'ClientName',
           A.IDEmployee, E.IDUser, E.Name 'EmployeeName', E.PhoneNumber 'EmployeePhoneNumber',
           A.IDStore, S.Location 'StoreLocation',
           A.IDStatus,ST.Name 'StatusName'
    FROM Appointment A
    LEFT JOIN Pet P on A.IDPet = P.IDPet
    LEFT JOIN Client C on P.IDClient = C.IDClient
    LEFT JOIN Employee E on A.IDEmployee = E.IDEmployee
    LEFT JOIN Store S on A.IDStore = S.IDStore
    LEFT JOIN StatusType ST on A.IDStatus = ST.IDStatus
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDAppointment
    @IDAppointment INT
AS
BEGIN
    SELECT A.IDAppointment, A.DateTime,
           A.IDPet, P.IDBreed, P.IDClient, P.Name 'PetName', P.Birthdate 'PetBirthdate', P.Weight 'PetWeight', P.Notes 'PetNotes',
           C.Name 'ClientName',
           A.IDEmployee, E.IDUser, E.Name 'EmployeeName', E.PhoneNumber 'EmployeePhoneNumber',
           A.IDStore, S.Location 'StoreLocation',
           A.IDStatus,ST.Name 'StatusName'
    FROM Appointment A
    LEFT JOIN Pet P on A.IDPet = P.IDPet
    LEFT JOIN Client C on P.IDClient = C.IDClient
    LEFT JOIN Employee E on A.IDEmployee = E.IDEmployee
    LEFT JOIN Store S on A.IDStore = S.IDStore
    LEFT JOIN StatusType ST on A.IDStatus = ST.IDStatus
    WHERE IDAppointment = @IDAppointment;
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
-- ask by pet
CREATE PROCEDURE GetAppointmentsByPet
    @IDPet INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        a.IDAppointment,
        e.Name AS EmployeeName,
        s.Location AS Location,
        st.Name AS StatusName,
        a.DateTime
    FROM 
        Appointment a
        INNER JOIN Employee e ON a.IDEmployee = e.IDEmployee
        INNER JOIN Store s ON a.IDStore = s.IDStore
        INNER JOIN StatusType st ON a.IDStatus = st.IDStatus
    WHERE 
        a.IDPet = @IDPet;
END;
GO

-- Create appointment and invoice
CREATE PROCEDURE CreateAppointmentAndInvoice
    @IDPet INT,
    @IDStore INT,
    @DateTime DATETIME,
    @IDClient INT,
    @IDEmployee INT
AS
BEGIN
    -- Inicia una transacción
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Inserta un nuevo appointment
        INSERT INTO Appointment (IDPet, IDEmployee, IDStore, IDStatus, DateTime)
        VALUES (@IDPet, @IDEmployee, @IDStore, 1, @DateTime);

        -- Obtiene el ID del appointment recién insertado
        DECLARE @IDAppointment INT;
        SET @IDAppointment = SCOPE_IDENTITY();

        -- Inserta un nuevo invoice basado en el appointment
        INSERT INTO Invoice (IDAppointment, IDClient, IDPayment, IDStatus, DateTime)
        VALUES (@IDAppointment, @IDClient, 1, 1, GETDATE());

        -- Si todo va bien, realiza el commit de la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, realiza el rollback de la transacción
        ROLLBACK TRANSACTION;

        -- Opcional: puedes lanzar el error para que el llamador lo gestione
        THROW;
    END CATCH
END;
GO

-------------------------------Breed-------------------------------

-- Create
CREATE PROCEDURE CreateBreed
    @Name NVARCHAR(128)
AS
BEGIN
    INSERT INTO Breed (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE  PROCEDURE ReadAllBreeds
AS
BEGIN
    SELECT B.IDBreed, B.Name
    FROM Breed B
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDBreed
    @IDBreed INT
AS
BEGIN
    SELECT B.IDBreed, B.Name
    FROM Breed B
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

    UPDATE Breed
    SET Name = @Name
    WHERE IDBreed = @IDBreed;
END;
GO

-- Delete By ID
CREATE PROCEDURE DeleteBreed
    @IDBreed INT
AS
BEGIN
    DELETE FROM Breed 
    WHERE IDBreed = @IDBreed;
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

CREATE PROCEDURE CreateClientAndUser
    @Name NVARCHAR(255),
    @PhoneNumber NVARCHAR(20),
    @Password NVARCHAR(255),
    @LoginID NVARCHAR(255),
    @IDUserType INT
AS
BEGIN
    DECLARE @NewUserID INT;

    INSERT INTO [User] (Password, LoginID, IDUserType)
    VALUES (@Password, @LoginID, @IDUserType);

    SET @NewUserID = SCOPE_IDENTITY();  -- Or @@IDENTITY depending on your SQL Server version

    INSERT INTO Client (Name, PhoneNumber, IDUser)
    VALUES (@Name, @PhoneNumber, @NewUserID);
END;
GO

-- Create client by Mockup
CREATE PROCEDURE CreateMockClient
AS
BEGIN
    DECLARE @IDClient INT;

    INSERT INTO Client (Name, PhoneNumber, IDUser)
    VALUES ('MockUser', NULL, 1); -- TODO: Change for mockup ID

    SET @IDClient = SCOPE_IDENTITY();

    UPDATE Client
    SET Name = Concat(Name, IDClient)
    WHERE IDClient = @IDClient;

    SELECT C.IDClient, C.IDUser, C.Name, C.PhoneNumber,
           U.IDUserType, U.LoginID
    FROM Client C
    LEFT JOIN [User] U on C.IDUser = U.IDUser
    WHERE IDClient = @IDClient;
END;
GO

-- Read All
CREATE PROCEDURE ReadAllClients
AS
BEGIN
    SELECT C.IDClient, C.IDUser, C.Name, C.PhoneNumber,
           U.IDUserType, U.LoginID
    FROM Client C
    LEFT JOIN [User] U on C.IDUser = U.IDUser
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDClient
    @IDClient INT
AS
BEGIN
    SELECT C.IDClient, C.IDUser, C.Name, C.PhoneNumber,
           U.IDUserType, U.LoginID
    FROM Client C
    LEFT JOIN [User] U on C.IDUser = U.IDUser
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

-- Upgrade Client to Employee
CREATE PROCEDURE UpgradeClientToEmployee
    @IDUser INT
AS
BEGIN
    DECLARE @Name NVARCHAR(64);
    DECLARE @PhoneNumber NVARCHAR(16);

    SELECT @Name = Name, @PhoneNumber = PhoneNumber
    FROM Client
    WHERE IDUser = @IDUser;

    INSERT INTO Employee (IDUser, Name, PhoneNumber)
    VALUES (@IDUser, @Name, @PhoneNumber);

    UPDATE [User]
    SET IDUserType = 3
    WHERE IDUser = @IDUser
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
    SELECT E.IDEmployee, E.IDUser, E.Name, E.PhoneNumber,
           U.IDUserType, U.LoginID
    FROM Employee E
    LEFT JOIN [User] U on E.IDUser = U.IDUser;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDEmployee
    @IDEmployee INT
AS
BEGIN
    SELECT E.IDEmployee, E.IDUser, E.Name, E.PhoneNumber,
           U.IDUserType, U.LoginID
    FROM Employee E
    LEFT JOIN [User] U on E.IDUser = U.IDUser
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

-- Downgrade Employee to Client
CREATE PROCEDURE DowngradeEmployeeToClient
    @IDUser INT
AS
BEGIN
    UPDATE Employee
    SET IDUser = 1
    WHERE IDUser = @IDUser

    UPDATE [User]
    SET IDUserType = 4
    WHERE IDUser = @IDUser
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
    SELECT I.IDProduct, I.IDStore, I.Quantity,
           P.Name 'ProductName', P.Description 'ProductDescription', P.Price 'ProductPrice', P.IDProductType
    FROM Inventory I
    LEFT JOIN Product P on I.IDProduct = P.IDProduct;
END;
GO

-- Read by IDProduct
CREATE PROCEDURE ReadInventoryByIDProduct
    @IDProduct INT
AS
BEGIN
    SELECT 
        S.IDStore, 
        S.Location,
        ISNULL(I.Quantity, 0) AS Quantity,
        -- Flag showing if the product has an inventory in the store
        CASE 
            WHEN I.IDProduct IS NULL THEN 'false'
            ELSE 'true'
        END AS 'HasInventory'

    FROM STORE S 
    FULL OUTER JOIN Inventory I ON S.IDStore = I.IDStore AND I.IDProduct = @IDProduct
    LEFT JOIN Product P ON I.IDProduct = P.IDProduct OR P.IDProduct = @IDProduct
    WHERE (P.IDProduct = @IDProduct OR @IDProduct IS NULL) AND S.IDStore IS NOT NULL
    ORDER BY S.IDStore, P.IDProduct;
END;
GO


-- Read By Product And Store
CREATE PROCEDURE ReadInventoryByProductAndStore
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    SELECT I.IDProduct, I.IDStore, I.Quantity,
           P.Name 'ProductName', P.Description 'ProductDescription', P.Price 'ProductPrice', P.IDProductType
    FROM Inventory I
    LEFT JOIN Product P on I.IDProduct = P.IDProduct
    WHERE I.IDProduct = @IDProduct AND I.IDStore = @IDStore;
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

-- Update Quantity Inventory by IDProduct
CREATE PROCEDURE UpdateInventoryByIDProduct (
    @IDProduct INT,
    @Quantity INT
)
AS
BEGIN
    -- Initialize cursor
    DECLARE @IDStore INT;
    DECLARE @ActualQuantity INT;
    DECLARE @RemainingQuantity INT;
    SET @RemainingQuantity = @Quantity;

    DECLARE CURSOR_INVENTORY CURSOR FOR
    SELECT IDStore, Quantity
    FROM Inventory
    WHERE IDProduct = @IDProduct
    ORDER BY IDStore; -- Ensures a consistent order of processing

    OPEN CURSOR_INVENTORY;

    FETCH NEXT FROM CURSOR_INVENTORY INTO @IDStore, @ActualQuantity;
    WHILE @@FETCH_STATUS = 0 AND @RemainingQuantity > 0
    BEGIN
        IF @ActualQuantity >= @RemainingQuantity
        BEGIN
            UPDATE Inventory
            SET Quantity = Quantity - @RemainingQuantity
            WHERE IDStore = @IDStore AND IDProduct = @IDProduct;

            SET @RemainingQuantity = 0;
        END
        ELSE
        BEGIN
            UPDATE Inventory
            SET Quantity = 0
            WHERE IDStore = @IDStore AND IDProduct = @IDProduct;

            SET @RemainingQuantity = @RemainingQuantity - @ActualQuantity;
        END

        FETCH NEXT FROM CURSOR_INVENTORY INTO @IDStore, @ActualQuantity;
    END;

    CLOSE CURSOR_INVENTORY;
    DEALLOCATE CURSOR_INVENTORY;
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

-- Create Invoice and Invoice Details by Cart
CREATE PROCEDURE CreateInvoiceByCart
    @IDClient INT,
    @IDPayment INT,
    @Shipping NVARCHAR(5)
AS
BEGIN
    -- Insert New Invoice
    DECLARE @NewAppointmentID INT;
    DECLARE @NewIDInvoice INT;

    INSERT INTO Appointment (IDPet, IDEmployee, IDStore, IDStatus, DateTime)
    VALUES (1, 1, 1, 4, GETDATE()) -- TODO change mockup appointment

    SET @NewAppointmentID = SCOPE_IDENTITY();

    INSERT INTO Invoice (IDAppointment, IDClient, IDPayment, IDStatus, DateTime)
    VALUES (@NewAppointmentID, @IDClient, @IDPayment, 4, GETDATE()) -- TODO change status code

    SET @NewIDInvoice = SCOPE_IDENTITY();

    IF LOWER(@Shipping) = 'true'
    BEGIN
        INSERT INTO InvoiceDetail (IDInvoice, IDProduct, Description, Quantity, Price)
        VALUES (@NewIDInvoice, 1, 'Country-wide shipping', 1, 4500) -- TODO change mockup shipping
    END
    -- Initialize cursor
    DECLARE @IDProduct INT;
    DECLARE @Quantity INT;

    DECLARE CURSOR_ITEM CURSOR FOR
    SELECT IDProduct, Quantity
    FROM Cart
    WHERE IDClient = @IDClient;

    OPEN CURSOR_ITEM;

    FETCH NEXT FROM CURSOR_ITEM INTO @IDProduct, @Quantity;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        PRINT('IDProduct: ' + CAST(@IDProduct AS NVARCHAR(8)) + ' Quantity: ' + CAST(@Quantity AS NVARCHAR(8)));
        DECLARE @EnoughQuantity NVARCHAR(8);
        EXEC EnoughQuantityByIDProduct @IDProduct, @Quantity, @EnoughQuantity = @EnoughQuantity OUTPUT;

        IF LOWER(@EnoughQuantity) = 'true'
            BEGIN
                DECLARE @Description NVARCHAR(512);
                DECLARE @Price MONEY;

                SELECT @Description = Description, @Price = Price
                FROM Product
                WHERE IDProduct = @IDProduct;

                INSERT INTO InvoiceDetail (IDInvoice, IDProduct, Description, Quantity, Price)
                VALUES (@NewIDInvoice, @IDProduct, @Description, @Quantity, (@Price * @Quantity))

                EXEC UpdateInventoryByIDProduct @IDProduct, @Quantity;
            END
        FETCH NEXT FROM CURSOR_ITEM INTO @IDProduct, @Quantity;
    END;
    CLOSE CURSOR_ITEM;
    DEALLOCATE CURSOR_ITEM;

END;
GO

-- Read All
CREATE PROCEDURE ReadAllInvoices
AS
BEGIN
    SELECT I.IDInvoice, I.DateTime 'InvoiceDateTime',
           I.IDAppointment,A.IDPet, A.IDEmployee, A.IDStore, A.IDStatus 'AppointmentIDStatus', A.DateTime 'AppointmentDateTime',
           I.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber',
           I.IDPayment, P.IDPaymentType, P.Name 'PaymentName',
           I.IDStatus, ST.Name 'StatusName'
    FROM Invoice I
    LEFT JOIN Appointment A on I.IDAppointment = A.IDAppointment
    LEFT JOIN Client C ON I.IDClient = C.IDClient
    LEFT JOIN Payment P on I.IDPayment = P.IDPayment
    LEFT JOIN StatusType ST on I.IDStatus = ST.IDStatus;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDInvoice
    @IDInvoice INT
AS
BEGIN
    SELECT I.IDInvoice, I.DateTime 'InvoiceDateTime',
           I.IDAppointment,A.IDPet, A.IDEmployee, A.IDStore, A.IDStatus 'AppointmentIDStatus', A.DateTime 'AppointmentDateTime',
           I.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber',
           I.IDPayment, P.IDPaymentType, P.Name 'PaymentName',
           I.IDStatus, ST.Name 'StatusName'
    FROM Invoice I
    LEFT JOIN Appointment A on I.IDAppointment = A.IDAppointment
    LEFT JOIN Client C ON I.IDClient = C.IDClient
    LEFT JOIN Payment P on I.IDPayment = P.IDPayment
    LEFT JOIN StatusType ST on I.IDStatus = ST.IDStatus
    WHERE IDInvoice = @IDInvoice;
END;
GO

-- Read By IDClient
CREATE PROCEDURE ReadInvoicesByIDClient
    @IDClient INT
AS
BEGIN
    SELECT * 
    FROM (  SELECT  I.IDClient, I.IDInvoice, I.DateTime 'InvoiceDateTime',
                    I.IDStatus, ST.Name 'StatusName',
                    SUM(ID.Price) 'TotalPrice'
            FROM Invoice I
            LEFT JOIN StatusType ST on I.IDStatus = ST.IDStatus
            LEFT JOIN InvoiceDetail ID on I.IDInvoice = ID.IDInvoice
            GROUP BY  I.IDClient, I.IDInvoice, I.DateTime, I.IDStatus, ST.Name      ) AS T
    WHERE T.IDClient = @IDClient;
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
    SELECT ID.IDInvoiceDetail, ID.Description,ID.Quantity, ID.Price,
           ID.IDInvoice, I.IDAppointment, I.IDClient, I.IDPayment, I.IDStatus, I.DateTime 'InvoiceDateTime',
           ID.IDProduct, P.IDProductType, P.Name 'ProductName', P.Description 'ProductDescription', P.Price 'ProductPrice'
    FROM InvoiceDetail ID
    LEFT JOIN Invoice I on ID.IDInvoice = I.IDInvoice
    LEFT JOIN Product P on ID.IDProduct = P.IDProduct;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDInvoiceDetail
    @IDInvoiceDetail INT
AS
BEGIN
    SELECT ID.IDInvoiceDetail, ID.Description,ID.Quantity, ID.Price,
           ID.IDInvoice, I.IDAppointment, I.IDClient, I.IDPayment, I.IDStatus, I.DateTime 'InvoiceDateTime',
           ID.IDProduct, P.IDProductType, P.Name 'ProductName', P.Description 'ProductDescription', P.Price 'ProductPrice'
    FROM InvoiceDetail ID
    LEFT JOIN Invoice I on ID.IDInvoice = I.IDInvoice
    LEFT JOIN Product P on ID.IDProduct = P.IDProduct
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

CREATE PROCEDURE ReadInvoiceDetailsByInvoiceID
    @IDInvoice INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verifica si la factura existe
    IF NOT EXISTS (SELECT 1 FROM Invoice WHERE IDInvoice = @IDInvoice)
    BEGIN
        PRINT 'Invoice not found';
        RETURN;
    END

    -- Recupera los detalles de la factura junto con la informaci�n de la factura
    SELECT 
        inv.IDInvoice,
        invd.IDInvoiceDetail,
        invd.IDProduct,
		p.Name,
        invd.Description,
        invd.Quantity,
        invd.Price
    FROM 
        Invoice inv
    INNER JOIN 
        InvoiceDetail invd ON inv.IDInvoice = invd.IDInvoice
	INNER JOIN
		Product p ON invd.IDProduct = p.IDProduct
		
    WHERE 
        inv.IDInvoice = @IDInvoice;
END
GO

-------------------------------Log-------------------------------

-- Create
CREATE PROCEDURE CreateLog
    @IDLogType INT,
    @IDUser INT,
    @Description NVARCHAR(255)
AS
BEGIN
    INSERT INTO Log (IDLogType, IDUser, DateTime, Description)
    VALUES (@IDLogType, @IDUser, GETDATE(), @Description);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllLogs
AS
BEGIN
    SELECT L.IDLog, L.IDUser, L.DateTime, L.Description,
           L.IDLogType, LT.Name 'LogTypeName'
    FROM Log L
    LEFT JOIN LogType LT on L.IDLogType = LT.IDLogType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDLog
    @IDLog INT
AS
BEGIN
    SELECT L.IDLog, L.IDUser, L.DateTime, L.Description,
           L.IDLogType, LT.Name 'LogTypeName'
    FROM Log L
    LEFT JOIN LogType LT on L.IDLogType = LT.IDLogType
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
    SELECT P.IDPayment, P.Name 'PaymentName',
           P.IDPaymentType, PT.Name 'PaymentTypeName'
    FROM Payment P
    LEFT JOIN PaymentType PT on P.IDPaymentType = PT.IDPaymentType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPayment
    @IDPayment INT
AS
BEGIN
    SELECT P.IDPayment, P.Name 'PaymentName',
           P.IDPaymentType, PT.Name 'PaymentTypeName'
    FROM Payment P
    LEFT JOIN PaymentType PT on P.IDPaymentType = PT.IDPaymentType
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
    SELECT P.IDPet, P.Name 'PetName', P.Birthdate, P.Weight, P.Notes,
           P.IDBreed, B.Name 'BreedName',
           P.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Pet P
    LEFT JOIN Breed B on P.IDBreed = B.IDBreed
    LEFT JOIN Client C on P.IDClient = C.IDClient;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPet
    @IDPet INT
AS
BEGIN
    SELECT P.IDPet, P.Name 'PetName', P.Birthdate, P.Weight, P.Notes,
           P.IDBreed, B.Name 'BreedName',
           P.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Pet P
    LEFT JOIN Breed B on P.IDBreed = B.IDBreed
    LEFT JOIN Client C on P.IDClient = C.IDClient
    WHERE IDPet = @IDPet;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDPet
    @IDPet INT
AS
BEGIN
    SELECT P.IDPet, P.Name 'PetName', P.Birthdate, P.Weight, P.Notes,
           P.IDBreed, B.Name 'BreedName',
           P.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Pet P
    LEFT JOIN Breed B on P.IDBreed = B.IDBreed
    LEFT JOIN Client C on P.IDClient = C.IDClient
    WHERE IDPet = @IDPet;
END;
GO

-- Read By IDClient
CREATE PROCEDURE ReadPetByIDClient
    @IDClient INT
AS
BEGIN
    SELECT P.IDPet, P.Name 'PetName', P.Birthdate, P.Weight, P.Notes,
           P.IDBreed, B.Name 'BreedName',
           P.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Pet P
    LEFT JOIN Breed B on P.IDBreed = B.IDBreed
    LEFT JOIN Client C on P.IDClient = C.IDClient
    WHERE P.IDClient = @IDClient;
END;
GO

-- Read By IDClient
CREATE PROCEDURE ReadPetByNameClient
    @Name NVARCHAR(64)
AS
BEGIN
    SELECT TOP 1 P.IDPet, P.Name 'PetName', P.Birthdate, P.Weight, P.Notes,
           P.IDBreed, B.Name 'BreedName',
           P.IDClient, C.IDUser, C.Name 'UserName', C.PhoneNumber 'UserPhoneNumber'
    FROM Pet P
    LEFT JOIN Breed B on P.IDBreed = B.IDBreed
    LEFT JOIN Client C on P.IDClient = C.IDClient
    WHERE C.Name = @Name;
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

-------------------------------Product-------------------------------

-- Create
CREATE PROCEDURE CreateProduct
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY,
    @URL NVARCHAR(1028)
AS
BEGIN
    INSERT INTO Product (IDProductType, Name, Description, Price, URL)
    VALUES (@IDProductType, @Name, @Description, @Price, @URL);
END;
GO

  -- Read All
CREATE PROCEDURE ReadAllProducts
AS
BEGIN
    SELECT  T.IDProduct, T.ProductName, T.Description, T.Price,
            T.IDProductType, T.URL, T.ProductTypeName, COALESCE(SUM(T.Quantity), 0) 'Stock'

    FROM (
            SELECT  P.IDProduct, P.Name 'ProductName', P.Description, P.Price,
                    P.IDProductType, P.URL, PT.Name 'ProductTypeName', I.Quantity
            FROM Product P
            LEFT JOIN ProductType PT on P.IDProductType = PT.IDProductType
            LEFT JOIN Inventory I on P.IDProduct = I.IDProduct
        ) AS T
    
    GROUP BY T.IDProduct, T.ProductName, T.Description, T.Price, T.IDProductType, T.URL, T.ProductTypeName;

END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDProduct
    @IDProduct INT
AS
BEGIN
    SELECT P.IDProduct, P.Name 'ProductName', P.Description, P.Price,
           P.IDProductType, P.URL, PT.Name 'ProductTypeName'
    FROM Product P
    LEFT JOIN ProductType PT on P.IDProductType = PT.IDProductType
    WHERE IDProduct = @IDProduct;
END;
GO

-- Update
CREATE PROCEDURE UpdateProduct
    @IDProduct INT,
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY,
    @URL NVARCHAR(1028)
AS
BEGIN
    UPDATE Product
    SET IDProductType = @IDProductType,
        Name = @Name,
        Description = @Description,
        Price = @Price,
        URL = @URL
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

CREATE PROCEDURE ReadMedicineOrServiceProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.IDProduct,
        p.Name,
        p.Description,
        p.Price,
        pt.Name AS ProductTypeName
    FROM 
        Product p
    INNER JOIN 
        ProductType pt ON p.IDProductType = pt.IDProductType
    WHERE 
        pt.Name IN ('Medicine', 'Services');
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
    SELECT R.IDReview, R.Description 'ReviewDescription', R.Rating, R.DateTime,
           R.IDProduct, P.IDProductType, P.Name 'ProductName', P.Description 'ProductDescription', P.Price,
           R.IDClient, C.IDUser, C.Name 'ClientName', PhoneNumber 'ClientPhoneNumber'
    FROM Review R
    LEFT JOIN Product P on R.IDProduct = P.IDProduct
    LEFT JOIN Client C on R.IDClient = C.IDClient;
END;
GO

-- Read Average by ID
CREATE PROCEDURE ReadAverageByIDReview
    @IDProduct INT
AS
BEGIN
    SELECT CAST(AVG(CAST(R.Rating AS FLOAT)) AS FLOAT) AS 'Average'
    FROM Review R
    LEFT JOIN Product P on R.IDProduct = P.IDProduct
    LEFT JOIN Client C on R.IDClient = C.IDClient
    WHERE R.IDProduct = @IDProduct
    GROUP BY R.IDProduct;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDReview
    @IDProduct INT
AS
BEGIN
    SELECT R.IDReview, R.Description 'ReviewDescription', R.Rating, R.DateTime,
           R.IDProduct, P.IDProductType, P.Name 'ProductName', P.Description 'ProductDescription', P.Price,
           R.IDClient, C.IDUser, C.Name 'ClientName', PhoneNumber 'ClientPhoneNumber'
    FROM Review R
    LEFT JOIN Product P on R.IDProduct = P.IDProduct
    LEFT JOIN Client C on R.IDClient = C.IDClient
    WHERE R.IDProduct = @IDProduct;
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
CREATE PROCEDURE ReadAllShipments
AS
BEGIN
    SELECT S.IDShipping, S.TrackingID,
           S.IDInvoice, I.IDAppointment, I.IDClient 'InvoiceClient', I.IDPayment, I.IDStatus 'InvoiceIDStatus', I.DateTime,
           S.IDAddress, A.IDClient 'AddressClient', A.Province, A.City, A.District, A.ZIPCode, A.Description,
           S.IDStatus 'ShippingIDStatus', ST.Name 'StatusName'
    FROM Shipping S
    LEFT JOIN Invoice I on S.IDInvoice = I.IDInvoice
    LEFT JOIN Address A on S.IDAddress = A.IDAddress
    LEFT JOIN StatusType ST on S.IDStatus = ST.IDStatus;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDShipping
    @IDShipping INT
AS
BEGIN
    SELECT S.IDShipping, S.TrackingID,
           S.IDInvoice, I.IDAppointment, I.IDClient 'InvoiceClient', I.IDPayment, I.IDStatus 'InvoiceIDStatus', I.DateTime,
           S.IDAddress, A.IDClient 'AddressClient', A.Province, A.City, A.District, A.ZIPCode, A.Description,
           S.IDStatus 'ShippingIDStatus', ST.Name 'StatusName'
    FROM Shipping S
    LEFT JOIN Invoice I on S.IDInvoice = I.IDInvoice
    LEFT JOIN Address A on S.IDAddress = A.IDAddress
    LEFT JOIN StatusType ST on S.IDStatus = ST.IDStatus
    WHERE IDShipping = @IDShipping;
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
    SELECT U.IDUser, U.LoginID,
           U.IDUserType, UT.Name 'UserTypeName'
    FROM [User] U
    LEFT JOIN UserType UT on U.IDUserType = UT.IDUserType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDUser
    @IDUser INT
AS
BEGIN
    SELECT U.IDUser, U.LoginID, U.Password,
           U.IDUserType, UT.Name 'UserTypeName'
    FROM [User] U
    LEFT JOIN UserType UT on U.IDUserType = UT.IDUserType
    WHERE IDUser = @IDUser;
END;
GO

-- Read By Mail
CREATE PROCEDURE ReadUserByMail
    @LoginID NVARCHAR(225)
AS
BEGIN
    SELECT U.IDUser, U.LoginID, U.Password,
           U.IDUserType, UT.Name 'UserTypeName'
    FROM [User] U
    LEFT JOIN UserType UT on U.IDUserType = UT.IDUserType
    WHERE @LoginID = LoginID;
END;
GO

-- Update
CREATE PROCEDURE UpdateUser
    @IDUser INT,
    @LoginID NVARCHAR(225),
    @NewPassword VARBINARY(255),
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
    @Name NVARCHAR(64)
AS
BEGIN
    INSERT INTO UserType (Name)
    VALUES (@Name);
END;
GO

-- Read All
CREATE PROCEDURE ReadAllUserTypes
AS
BEGIN
    SELECT IDUserType, Name
    FROM UserType;
END;
GO

-- Read By ID
CREATE PROCEDURE ReadByIDUserType
    @IDUserType INT
AS
BEGIN
    SELECT IDUserType, Name
    FROM UserType
    WHERE IDUserType = @IDUserType;
END;
GO

-- Update
CREATE PROCEDURE UpdateUserType
    @IDUserType INT,
    @Name NVARCHAR(64)
AS
BEGIN
    UPDATE UserType
    SET Name = @Name
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

-------------------------------Cart-------------------------------

-- Create
CREATE PROCEDURE CreateCart
    @IDClient INT,
    @IDProduct INT,
    @Quantity INT
AS
BEGIN
    INSERT INTO Cart (IDClient, IDProduct, Quantity)
    VALUES (@IDClient, @IDProduct, @Quantity);
END;
GO

-- Read available quantity of a product
CREATE or alter PROCEDURE EnoughQuantityByIDProduct (
    @IDProduct INT,
    @Quantity INT,
    @EnoughQuantity NVARCHAR(8) OUTPUT
)
AS
BEGIN
    DECLARE @ActualQuantity INT;

    SELECT @ActualQuantity = SUM(Quantity)
    FROM Inventory
    WHERE IDProduct = @IDProduct;

    IF @Quantity <= @ActualQuantity
    BEGIN
        SET @EnoughQuantity = 'True';
    END
    ELSE
    BEGIN
        SET @EnoughQuantity = 'False';
    END;
END;
GO

-- Read available quantity of a product
CREATE PROCEDURE EnoughQuantityByCart(
    @IDClient INT
)
AS
BEGIN
    DECLARE @IDProduct INT;
    DECLARE @Quantity INT;
    DECLARE @EnoughQuantity NVARCHAR(8);

    DECLARE CURSOR_ITEM CURSOR FOR
    SELECT IDProduct, Quantity
    FROM Cart
    WHERE IDClient = @IDClient;

    OPEN CURSOR_ITEM;

    SET @EnoughQuantity = 'True';

    FETCH NEXT FROM CURSOR_ITEM INTO @IDProduct, @Quantity;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @ActualQuantity INT;
		PRINT(CONCAT('ID: ', @IDProduct))
		PRINT(CONCAT('Quantity: ', @Quantity))

        SELECT @ActualQuantity = COALESCE(SUM(Quantity), 0)
        FROM Product P LEFT JOIN Inventory I 
                on P.IDProduct = I.IDProduct
        WHERE P.IDProduct = @IDProduct;
        PRINT(@ActualQuantity)
        IF @Quantity > @ActualQuantity
        BEGIN
            SET @EnoughQuantity = 'False';
            BREAK;
        END

        FETCH NEXT FROM CURSOR_ITEM INTO @IDProduct, @Quantity;
    END;

    CLOSE CURSOR_ITEM;
    DEALLOCATE CURSOR_ITEM;

    SELECT @EnoughQuantity 'BoolValue';
END;
GO

-- Read All
CREATE PROCEDURE ReadAllCarts
AS
BEGIN
    SELECT C.IDClient, C2.IDUser, C2.Name 'ClientName', C2.PhoneNumber,
           C.IDProduct, p.IDProductType, P.Name 'ProductName', Description, Price, C.Quantity
    FROM Cart C
    LEFT JOIN Client C2 on C.IDClient = C2.IDClient
    LEFT JOIN Product P on C.IDProduct = P.IDProduct;
END;
GO

-- Read By Product And Store
CREATE PROCEDURE ReadCartByClientAndProduct
    @IDClient INT,
    @IDProduct INT
AS
BEGIN
    SELECT C.IDClient, C2.IDUser, C2.Name 'ClientName', C2.PhoneNumber,
           C.IDProduct, p.IDProductType, P.Name 'ProductName', P.URL, Description, Price, C.Quantity
    FROM Cart C
    LEFT JOIN Client C2 on C.IDClient = C2.IDClient
    LEFT JOIN Product P on C.IDProduct = P.IDProduct
    WHERE C.IDClient = @IDClient AND C.IDProduct = @IDProduct;
END;
GO

-- Read By Product And Store
CREATE PROCEDURE ReadCartByClient
    @IDClient INT
AS
BEGIN
    SELECT			  C.IDClient
					, C.IDProduct
					, P.Name				'ProductName'
					, P.IDProductType		'ProductType'
                    , P.URL                 'URL'
					, P.Description			'ProductDescription'
					, P.Price				'ProductPrice'
					, C.Quantity			'CartQuantity'
    FROM Cart C LEFT JOIN Product P ON C.IDProduct = P.IDProduct
    WHERE IDClient = @IDClient;
END;
GO

-- Update
CREATE PROCEDURE UpdateCart
    @IDClient INT,
    @IDProduct INT,
    @Quantity INT
AS
BEGIN
    UPDATE Cart
    SET IDClient = @IDClient,
        IDProduct = @IDProduct,
        Quantity = @Quantity
    WHERE IDClient = @IDClient AND IDProduct = @IDProduct;
END;
GO

-- Delete specific product from cart
CREATE PROCEDURE DeleteCart
    @IDClient INT,
    @IDProduct INT
AS
BEGIN
    DELETE FROM Cart
    WHERE IDClient = @IDClient AND IDProduct = @IDProduct;
END;
GO
-- Delete all products from cart
CREATE PROCEDURE DeleteAllCartByClient
    @IDClient INT
AS
BEGIN
    DELETE FROM Cart
    WHERE IDClient = @IDClient;
END;
GO


