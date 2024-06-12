CREATE TABLE [User] (
    IDUser INT IDENTITY(1,1) PRIMARY KEY,
	IDUserType INT,
    LoginID NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
	FOREIGN KEY (IDUserType) REFERENCES UserType(IDUserType),
);

CREATE TABLE LogType (
    IDLogType INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Log (
    IDLog INT IDENTITY(1,1) PRIMARY KEY,
    IDLogType INT,
    IDUser INT,
    DateTime DATETIME NOT NULL,
    Description NVARCHAR(255),
    FOREIGN KEY (IDLogType) REFERENCES LogType(IDLogType),
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE Client (
    IDClient INT IDENTITY(1,1) PRIMARY KEY,
    IDUser INT,
    Name NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20),
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE Employee (
    IDEmployee INT IDENTITY(1,1) PRIMARY KEY,
    IDUser INT,
    Name NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20),
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE UserType (
    IDUserType INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(64) NOT NULL,
    Clearance INT NOT NULL
);

CREATE TABLE ProductType (
    IDProductType INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL
);

CREATE TABLE Product (
    IDProduct INT IDENTITY(1,1) PRIMARY KEY,
    IDProductType INT,
    Name NVARCHAR(255) NOT NULL,
    Description NVARCHAR(512),
    Price MONEY NOT NULL,
    FOREIGN KEY (IDProductType) REFERENCES ProductType(IDProductType)
);

CREATE TABLE Store (
    IDStore INT IDENTITY(1,1) PRIMARY KEY,
    Location NVARCHAR(128) NOT NULL
);

CREATE TABLE Inventory (
    IDProduct INT,
    IDStore INT,
    Quantity INT,
    PRIMARY KEY (IDProduct, IDStore),
    FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct),
    FOREIGN KEY (IDStore) REFERENCES Store(IDStore)
);

CREATE TABLE Review (
    IDReview INT IDENTITY(1,1) PRIMARY KEY,
    IDProduct INT,
    IDClient INT,
    Description NVARCHAR(512),
    Rating TINYINT CHECK (Rating >= 1 AND Rating <= 5),
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient)
);

CREATE TABLE PetType (
    IDPetType INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Breed (
    IDBreed INT IDENTITY(1,1) PRIMARY KEY,
    IDPetType INT,
    Name NVARCHAR(128) NOT NULL,
    FOREIGN KEY (IDPetType) REFERENCES PetType(IDPetType)
);

CREATE TABLE Pet (
    IDPet INT IDENTITY(1,1) PRIMARY KEY,
    IDBreed INT,
    IDClient INT,
    Name NVARCHAR(128) NOT NULL,
    Birthdate DATE,
    Weight INT,
    Notes NVARCHAR(512),
    FOREIGN KEY (IDBreed) REFERENCES Breed(IDBreed),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient)
);

CREATE TABLE StatusType (
    IDStatus INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Appointment (
    IDAppointment INT IDENTITY(1,1) PRIMARY KEY,
    IDPet INT,
    IDEmployee INT,
    IDStore INT,
    IDStatus INT,
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (IDPet) REFERENCES Pet(IDPet),
    FOREIGN KEY (IDEmployee) REFERENCES Employee(IDEmployee),
    FOREIGN KEY (IDStore) REFERENCES Store(IDStore),
    FOREIGN KEY (IDStatus) REFERENCES StatusType(IDStatus)
);

CREATE TABLE PaymentType (
    IDPaymentType INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Payment (
    IDPayment INT IDENTITY(1,1) PRIMARY KEY,
    IDPaymentType INT,
    Name NVARCHAR(64) NOT NULL,
    FOREIGN KEY (IDPaymentType) REFERENCES PaymentType(IDPaymentType)
);

CREATE TABLE Invoice (
    IDInvoice INT IDENTITY(1,1) PRIMARY KEY,
    IDAppointment INT,
    IDClient INT,
    IDPayment INT,
    IDStatus INT,
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (IDAppointment) REFERENCES Appointment(IDAppointment),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient),
    FOREIGN KEY (IDPayment) REFERENCES Payment(IDPayment),
    FOREIGN KEY (IDStatus) REFERENCES StatusType(IDStatus)
);

CREATE TABLE InvoiceDetail (
    IDInvoiceDetail INT IDENTITY(1,1) PRIMARY KEY,
    IDInvoice INT,
    IDProduct INT,
    Description NVARCHAR(512),
    Quantity INT NOT NULL,
    Price MONEY NOT NULL,
    FOREIGN KEY (IDInvoice) REFERENCES Invoice(IDInvoice),
    FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct)
);

CREATE TABLE Address (
    IDAddress INT IDENTITY(1,1) PRIMARY KEY,
    IDClient INT,
    Province NVARCHAR(16),
    City NVARCHAR(64),
    District NVARCHAR(64),
    ZIPCode NVARCHAR(10),
    Description NVARCHAR(512),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient)
);

CREATE TABLE Shipping (
    IDShipping INT IDENTITY(1,1) PRIMARY KEY,
    IDInvoice INT,
    IDAddress INT,
    IDStatus INT,
    TrackingID NVARCHAR(128),
    FOREIGN KEY (IDInvoice) REFERENCES Invoice(IDInvoice),
    FOREIGN KEY (IDAddress) REFERENCES Address(IDAddress),
    FOREIGN KEY (IDStatus) REFERENCES StatusType(IDStatus)
);