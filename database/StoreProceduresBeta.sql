
--Employees 
CREATE PROCEDURE CreateEmployee
    @IDUser INT,
    @Name NVARCHAR(255),
    @PhoneNumber BIGINT
AS
BEGIN
    INSERT INTO Employee (IDUser, Name, PhoneNumber)
    VALUES (@IDUser, @Name, @PhoneNumber);
END;

GO
CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT IDEmployee, IDUser, Name, PhoneNumber
    FROM Employee;
END;
GO

CREATE PROCEDURE GetEmployeeByID
    @IDEmployee INT
AS
BEGIN
    SELECT IDEmployee, IDUser, Name, PhoneNumber
    FROM Employee
    WHERE IDEmployee = @IDEmployee;
END;
GO

CREATE PROCEDURE UpdateEmployee
    @IDEmployee INT,
    @IDUser INT,
    @Name NVARCHAR(255),
    @PhoneNumber BIGINT
AS
BEGIN
    UPDATE Employee
    SET IDUser = @IDUser,
        Name = @Name,
        PhoneNumber = @PhoneNumber
    WHERE IDEmployee = @IDEmployee;
END;
GO

CREATE PROCEDURE DeleteEmployee
    @IDEmployee INT
AS
BEGIN
    DELETE FROM Employee
    WHERE IDEmployee = @IDEmployee;
END;

--User
GO

CREATE PROCEDURE CreateUser
    @LoginID NVARCHAR(255),
    @Password VARBINARY(255)
AS
BEGIN
    
    INSERT INTO Users (LoginID, PasswordHash)
    VALUES (@LoginID, @Password)
END

GO
CREATE PROCEDURE GetAllUsers
AS
BEGIN
    SELECT IDUser, LoginID
    FROM Users
END

GO
CREATE PROCEDURE GetUserByID
    @IDUser INT
AS
BEGIN
    SELECT IDUser, LoginID
    FROM Users
    WHERE IDUser = @IDUser
END

GO
Create Procedure GetUserByMail
	@LoginID NVARCHAR(225)
AS
BEGIN
	SELECT IDUser, LoginID, PasswordHash
	FROM Users
	WHERE @LoginID = LoginID
END


GO
CREATE PROCEDURE UpdateUser
    @IDUser INT,
	@LoginID NVARCHAR(225),
    @NewPassword VARBINARY(255)
AS
BEGIN
    
    UPDATE Users
    SET PasswordHash = @NewPassword,
	 LoginID = @LoginID 

    WHERE IDUser = @IDUser
END

CREATE PROCEDURE DeleteUser
    @IDUser INT
AS
BEGIN
    DELETE FROM Users
    WHERE IDUser = @IDUser
END

-- client

CREATE PROCEDURE UpdateClient
    @IDClient INT,
    @Name NVARCHAR(255),
    @PhoneNumber INT,
    @IDUser INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Client
    SET Name = @Name,
        PhoneNumber = @PhoneNumber,
        IDUser = @IDUser
    WHERE IDClient = @IDClient;
END
GO

-- Procedimiento almacenado para obtener un cliente por su ID
CREATE PROCEDURE GetClientById
    @IDClient INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDClient, Name, PhoneNumber, IDUser
    FROM Client
    WHERE IDClient = @IDClient;
END
GO

-- Procedimiento almacenado para obtener todos los clientes
CREATE PROCEDURE GetAllClients
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDClient, Name, PhoneNumber, IDUser
    FROM Client;
END
GO

-- Procedimiento almacenado para crear un cliente
CREATE PROCEDURE CreateClient
    @Name NVARCHAR(255),
    @PhoneNumber INT,
    @IDUser INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Client (Name, PhoneNumber, IDUser)
    VALUES (@Name, @PhoneNumber, @IDUser);
END
GO

-- Procedimiento almacenado para eliminar un cliente
CREATE PROCEDURE DeleteClient
    @IDClient INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Client
    WHERE IDClient = @IDClient;
END
GO

--LogType

BEGIN
    CREATE TABLE LogType (
        IDLogType INT PRIMARY KEY IDENTITY,
        Name NVARCHAR(255) NOT NULL
    );
END
GO

-- Procedimiento almacenado para obtener todos los tipos de log
CREATE PROCEDURE GetAllLogTypes
AS
BEGIN

    SELECT *
    FROM LogType;
END
GO


-- Procedimiento almacenado para obtener un tipo de log por su ID
CREATE PROCEDURE GetLogTypeById
    @IDLogType INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDLogType, Name
    FROM LogType
    WHERE IDLogType = @IDLogType;
END
GO

-- Procedimiento almacenado para crear un nuevo tipo de log
CREATE PROCEDURE CreateLogType
    @Name NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO LogType (Name)
    VALUES (@Name);
END
GO

-- Procedimiento almacenado para actualizar un tipo de log
CREATE PROCEDURE UpdateLogType
    @IDLogType INT,
    @Name NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE LogType
    SET Name = @Name
    WHERE IDLogType = @IDLogType;
END
GO

-- Procedimiento almacenado para eliminar un tipo de log
CREATE PROCEDURE DeleteLogType
    @IDLogType INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM LogType
    WHERE IDLogType = @IDLogType;
END
GO

--UserType
CREATE PROCEDURE GetAllUserTypes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDUserType, Name, Clearance
    FROM UserType;
END

GO
CREATE PROCEDURE GetUserTypeById
    @IDUserType INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDUserType, Name, Clearance
    FROM UserType
    WHERE IDUserType = @IDUserType;
END

GO

CREATE PROCEDURE CreateUserType
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO UserType (Name, Clearance)
    VALUES (@Name, @Clearance);
END
GO

CREATE PROCEDURE UpdateUserType
    @IDUserType INT,
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE UserType
    SET Name = @Name,
        Clearance = @Clearance
    WHERE IDUserType = @IDUserType;
END
GO

CREATE PROCEDURE DeleteUserType
    @IDUserType INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM UserType
    WHERE IDUserType = @IDUserType;
END
GO

--User Type
CREATE PROCEDURE GetAllUserTypes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDUserType, Name, Clearance
    FROM UserType;
END
GO

-- Procedimiento almacenado para obtener un tipo de usuario por su ID
CREATE PROCEDURE GetUserTypeById
    @IDUserType INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDUserType, Name, Clearance
    FROM UserType
    WHERE IDUserType = @IDUserType;
END
GO

-- Procedimiento almacenado para crear un nuevo tipo de usuario
CREATE PROCEDURE CreateUserType
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO UserType (Name, Clearance)
    VALUES (@Name, @Clearance);
END
GO

-- Procedimiento almacenado para actualizar un tipo de usuario
CREATE PROCEDURE UpdateUserType
    @IDUserType INT,
    @Name NVARCHAR(64),
    @Clearance INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE UserType
    SET Name = @Name,
        Clearance = @Clearance
    WHERE IDUserType = @IDUserType;
END
GO

-- Procedimiento almacenado para eliminar un tipo de usuario
CREATE PROCEDURE DeleteUserType
    @IDUserType INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM UserType
    WHERE IDUserType = @IDUserType;
END
GO

--Product
CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProduct, IDProductType, Name, Description, Price
    FROM Product;
END

GO

CREATE PROCEDURE GetProductById
    @IDProduct INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProduct, IDProductType, Name, Description, Price
    FROM Product
    WHERE IDProduct = @IDProduct;
END
GO

CREATE PROCEDURE CreateProduct
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Product (IDProductType, Name, Description, Price)
    VALUES (@IDProductType, @Name, @Description, @Price);
END
GO

CREATE PROCEDURE UpdateProduct
    @IDProduct INT,
    @IDProductType INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(512),
    @Price MONEY
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Product
    SET IDProductType = @IDProductType,
        Name = @Name,
        Description = @Description,
        Price = @Price
    WHERE IDProduct = @IDProduct;
END
GO

CREATE PROCEDURE DeleteProduct
    @IDProduct INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Product
    WHERE IDProduct = @IDProduct;
END
GO

--ProductType

CREATE PROCEDURE GetAllProductTypes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProductType, Name
    FROM ProductType;
END
GO

CREATE PROCEDURE GetProductTypeById
    @IDProductType INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProductType, Name
    FROM ProductType
    WHERE IDProductType = @IDProductType;
END
GO

CREATE PROCEDURE CreateProductType
    @Name NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProductType (Name)
    VALUES (@Name);
END
GO

CREATE PROCEDURE UpdateProductType
    @IDProductType INT,
    @Name NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE ProductType
    SET Name = @Name
    WHERE IDProductType = @IDProductType;
END
GO

CREATE PROCEDURE DeleteProductType
    @IDProductType INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM ProductType
    WHERE IDProductType = @IDProductType;
END
GO


--Inventory
CREATE PROCEDURE GetAllInventories
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProduct, IDStore, Quantity
    FROM Inventory;
END
GO


CREATE PROCEDURE GetInventoryByProductAndStore
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProduct, IDStore, Quantity
    FROM Inventory
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END
GO

CREATE PROCEDURE GetInventoryByProductAndStore
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDProduct, IDStore, Quantity
    FROM Inventory
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END
GO

CREATE PROCEDURE CreateInventory
    @IDProduct INT,
    @IDStore INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Inventory (IDProduct, IDStore, Quantity)
    VALUES (@IDProduct, @IDStore, @Quantity);
END
GO

CREATE PROCEDURE UpdateInventory
    @IDProduct INT,
    @IDStore INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Inventory
    SET Quantity = @Quantity
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END
GO

CREATE PROCEDURE DeleteInventory
    @IDProduct INT,
    @IDStore INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Inventory
    WHERE IDProduct = @IDProduct AND IDStore = @IDStore;
END
GO

--Store
-- Procedimiento almacenado para obtener todas las tiendas
CREATE PROCEDURE GetAllStores
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDStore, Location
    FROM Store;
END
GO

-- Procedimiento almacenado para obtener una tienda por su ID
CREATE PROCEDURE GetStoreById
    @IDStore INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDStore, Location
    FROM Store
    WHERE IDStore = @IDStore;
END
GO

-- Procedimiento almacenado para crear una nueva tienda
CREATE PROCEDURE CreateStore
    @Location NVARCHAR(128)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Store (Location)
    VALUES (@Location);
END
GO

-- Procedimiento almacenado para actualizar una tienda
CREATE PROCEDURE UpdateStore
    @IDStore INT,
    @Location NVARCHAR(128)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Store
    SET Location = @Location
    WHERE IDStore = @IDStore;
END
GO

-- Procedimiento almacenado para eliminar una tienda
CREATE PROCEDURE DeleteStore
    @IDStore INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Store
    WHERE IDStore = @IDStore;
END
GO

-- Review

CREATE PROCEDURE GetAllReviews
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDReview, IDProduct, IDClient, Description, Rating, DateTime
    FROM Review;
END
GO

-- Procedimiento almacenado para obtener una rese�a por su ID
CREATE PROCEDURE GetReviewById
    @IDReview INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDReview, IDProduct, IDClient, Description, Rating, DateTime
    FROM Review
    WHERE IDReview = @IDReview;
END
GO

-- Procedimiento almacenado para crear una nueva rese�a
CREATE PROCEDURE CreateReview
    @IDProduct INT,
    @IDClient INT,
    @Description NVARCHAR(512),
    @Rating TINYINT,
    @DateTime DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Review (IDProduct, IDClient, Description, Rating, DateTime)
    VALUES (@IDProduct, @IDClient, @Description, @Rating, @DateTime);
END
GO

-- Procedimiento almacenado para actualizar una rese�a
CREATE PROCEDURE UpdateReview
    @IDReview INT,
    @IDProduct INT,
    @IDClient INT,
    @Description NVARCHAR(512),
    @Rating TINYINT,
    @DateTime DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Review
    SET 
        IDProduct = @IDProduct,
        IDClient = @IDClient,
        Description = @Description,
        Rating = @Rating,
        DateTime = @DateTime
    WHERE IDReview = @IDReview;
END
GO

-- Procedimiento almacenado para eliminar una rese�a
CREATE PROCEDURE DeleteReview
    @IDReview INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Review
    WHERE IDReview = @IDReview;
END
GO

-- Log
CREATE PROCEDURE GetAllLogs
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDLog, IDLogType, IDUser, DateTime, Description
    FROM Log;
END
GO

-- Procedimiento almacenado para obtener un log por su ID
CREATE PROCEDURE GetLogById
    @IDLog INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IDLog, IDLogType, IDUser, DateTime, Description
    FROM Log
    WHERE IDLog = @IDLog;
END
GO

-- Procedimiento almacenado para crear un nuevo log
CREATE PROCEDURE CreateLog
    @IDLogType INT,
    @IDUser INT,
    @DateTime DATETIME,
    @Description NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Log (IDLogType, IDUser, DateTime, Description)
    VALUES (@IDLogType, @IDUser, @DateTime, @Description);
END
GO

-- Procedimiento almacenado para actualizar un log
CREATE PROCEDURE UpdateLog
    @IDLog INT,
    @IDLogType INT,
    @IDUser INT,
    @DateTime DATETIME,
    @Description NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Log
    SET 
        IDLogType = @IDLogType,
        IDUser = @IDUser,
        DateTime = @DateTime,
        Description = @Description
    WHERE IDLog = @IDLog;
END
GO

-- Procedimiento almacenado para eliminar un log
CREATE PROCEDURE DeleteLog
    @IDLog INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Log
    WHERE IDLog = @IDLog;
END
GO