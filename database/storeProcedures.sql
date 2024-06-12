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