CREATE TABLE [User] (
    IDUser INT PRIMARY KEY IDENTITY(1,1),
    LoginID NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL
);

CREATE TABLE LogType (
    IDLogType INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Log (
    IDLog INT PRIMARY KEY IDENTITY(1,1),
    IDLogType INT,
    IDUser INT,
    DateTime DATETIME NOT NULL,
    Description NVARCHAR(255),
    FOREIGN KEY (IDLogType) REFERENCES LogType(IDLogType),
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE Client (
    IDClient INT PRIMARY KEY IDENTITY(1,1),
    IDUser INT,
    Name NVARCHAR(255) NOT NULL,
    PhoneNumber INT,
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE Employee (
    IDEmployee INT PRIMARY KEY IDENTITY(1,1),
    IDUser INT,
    Name NVARCHAR(255) NOT NULL,
    PhoneNumber INT,
    FOREIGN KEY (IDUser) REFERENCES [User](IDUser)
);

CREATE TABLE UserType (
    IDUserType INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(64) NOT NULL,
    Clearance INT NOT NULL
);

CREATE TABLE ProductType (
    IDProductType INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL
);

CREATE TABLE Product (
    IDProduct INT PRIMARY KEY IDENTITY(1,1),
    IDProductType INT,
    Name NVARCHAR(255) NOT NULL,
    Description NVARCHAR(512),
    Price MONEY NOT NULL,
    FOREIGN KEY (IDProductType) REFERENCES ProductType(IDProductType)
);

CREATE TABLE Store (
    IDStore INT PRIMARY KEY IDENTITY(1,1),
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
    IDReview INT PRIMARY KEY IDENTITY(1,1),
    IDProduct INT,
    IDClient INT,
    Description NVARCHAR(512),
    Rating TINYINT CHECK (Rating >= 1 AND Rating <= 5),
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient)
);

CREATE TABLE PetType (
    IDPetType INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Breed (
    IDBreed INT PRIMARY KEY IDENTITY(1,1),
    IDPetType INT,
    Name NVARCHAR(128) NOT NULL,
    FOREIGN KEY (IDPetType) REFERENCES PetType(IDPetType)
);

CREATE TABLE Pet (
    IDPet INT PRIMARY KEY IDENTITY(1,1),
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
    IDStatus INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Appointment (
    IDAppointment INT PRIMARY KEY IDENTITY(1,1),
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
    IDPaymentType INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(64) NOT NULL
);

CREATE TABLE Payment (
    IDPayment INT PRIMARY KEY IDENTITY(1,1),
    IDPaymentType INT,
    Name NVARCHAR(64) NOT NULL,
    FOREIGN KEY (IDPaymentType) REFERENCES PaymentType(IDPaymentType)
);

CREATE TABLE Invoice (
    IDInvoice INT PRIMARY KEY IDENTITY(1,1),
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
    IDInvoiceDetail INT PRIMARY KEY IDENTITY(1,1),
    IDInvoice INT,
    IDProduct INT,
    Description NVARCHAR(512),
    Quantity INT NOT NULL,
    Price MONEY NOT NULL,
    FOREIGN KEY (IDInvoice) REFERENCES Invoice(IDInvoice),
    FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct)
);

CREATE TABLE Address (
    IDAddress INT PRIMARY KEY IDENTITY(1,1),
    IDClient INT,
    Province NVARCHAR(16),
    City NVARCHAR(64),
    District NVARCHAR(64),
    ZIPCode INT,
    Description NVARCHAR(512),
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient)
);

CREATE TABLE Shipping (
    IDShipping INT PRIMARY KEY IDENTITY(1,1),
    IDInvoice INT,
    IDAddress INT,
    IDStatus INT,
    TrackingID NVARCHAR(128),
    FOREIGN KEY (IDInvoice) REFERENCES Invoice(IDInvoice),
    FOREIGN KEY (IDAddress) REFERENCES Address(IDAddress),
    FOREIGN KEY (IDStatus) REFERENCES StatusType(IDStatus)
);