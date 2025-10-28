-- DDL_fixed.sql
-- Run on Microsoft SQL Server (SSMS / Azure Data Studio)

SET NOCOUNT ON;
IF DB_ID('BankDb') IS NULL
BEGIN
    PRINT 'Database BankDb not found - creating database BankDb';
    CREATE DATABASE BankDb;
END
GO

USE BankDb;
GO

-- Create schema
IF SCHEMA_ID('dbo') IS NULL
    EXEC ('CREATE SCHEMA dbo');
GO

-- Banks
CREATE TABLE dbo.Bank (
    BankId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    BankName NVARCHAR(100) NOT NULL,
    HeadOfficeLocation NVARCHAR(200) NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Bank_IsActive DEFAULT (1),
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Bank_CreatedAt DEFAULT (SYSUTCDATETIME())
);

-- Branches
CREATE TABLE dbo.Branch (
    BranchId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    BranchName NVARCHAR(100) NOT NULL,
    Location NVARCHAR(200) NULL,
    BankId INT NOT NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Branch_IsActive DEFAULT (1),
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Branch_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT FK_Branch_Bank FOREIGN KEY (BankId) REFERENCES dbo.Bank(BankId) ON DELETE NO ACTION
);

-- Customers (domain customers; separate from auth "User")
CREATE TABLE dbo.Customer (
    CustomerId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FullName NVARCHAR(200) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    Phone NVARCHAR(50) NULL,
    DateOfBirth DATE NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Customer_IsActive DEFAULT (1),
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Customer_CreatedAt DEFAULT (SYSUTCDATETIME())
);

CREATE UNIQUE INDEX UQ_Customer_Email ON dbo.Customer(Email);

-- Authentication users (for login/JWT)
CREATE TABLE dbo.[User] (
    UserId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    UserType NVARCHAR(50) NOT NULL CONSTRAINT CK_User_UserType CHECK (UserType IN ('Normal','Bank','Admin')),
    IsActive BIT NOT NULL CONSTRAINT DF_User_IsActive DEFAULT (1),
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_User_CreatedAt DEFAULT (SYSUTCDATETIME())
);

CREATE UNIQUE INDEX UQ_User_Username ON dbo.[User](Username);
CREATE UNIQUE INDEX UQ_User_Email ON dbo.[User](Email);

-- Accounts (each account belongs to a Customer and a Branch)
CREATE TABLE dbo.Account (
    AccountId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    AccountNumber NVARCHAR(50) NOT NULL,
    AccountType NVARCHAR(50) NOT NULL CONSTRAINT CK_Account_AccountType CHECK (AccountType IN ('Saving','Current','Term Deposit')),
    Balance DECIMAL(18,2) NOT NULL CONSTRAINT DF_Account_Balance DEFAULT (0.00),
    Currency NVARCHAR(10) NOT NULL CONSTRAINT DF_Account_Currency DEFAULT ('INR'),
    Status NVARCHAR(20) NOT NULL CONSTRAINT DF_Account_Status DEFAULT ('Active'),
    CustomerId INT NOT NULL,
    BranchId INT NOT NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Account_IsActive DEFAULT (1),
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Account_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT FK_Account_Customer FOREIGN KEY (CustomerId) REFERENCES dbo.Customer(CustomerId) ON DELETE NO ACTION,
    CONSTRAINT FK_Account_Branch FOREIGN KEY (BranchId) REFERENCES dbo.Branch(BranchId) ON DELETE NO ACTION
);

CREATE UNIQUE INDEX UQ_Account_AccountNumber ON dbo.Account(AccountNumber);

-- Roles and Permissions
CREATE TABLE dbo.Role (
    RoleId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    RoleName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NULL,
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Role_CreatedAt DEFAULT (SYSUTCDATETIME())
);

CREATE UNIQUE INDEX UQ_Role_RoleName ON dbo.Role(RoleName);

CREATE TABLE dbo.Permission (
    PermissionId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    PermissionCode NVARCHAR(150) NOT NULL, -- e.g. customers.create
    Description NVARCHAR(400) NULL,
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Permission_CreatedAt DEFAULT (SYSUTCDATETIME())
);

CREATE UNIQUE INDEX UQ_Permission_Code ON dbo.Permission(PermissionCode);

-- RolePermission (many-to-many)
CREATE TABLE dbo.RolePermission (
    RoleId INT NOT NULL,
    PermissionId INT NOT NULL,
    AssignedAt DATETIME2(3) NOT NULL CONSTRAINT DF_RolePermission_AssignedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT PK_RolePermission PRIMARY KEY (RoleId, PermissionId),
    CONSTRAINT FK_RP_Role FOREIGN KEY (RoleId) REFERENCES dbo.Role(RoleId) ON DELETE CASCADE,
    CONSTRAINT FK_RP_Permission FOREIGN KEY (PermissionId) REFERENCES dbo.Permission(PermissionId) ON DELETE CASCADE
);

-- UserRole (link auth user <-> role)
CREATE TABLE dbo.UserRole (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    AssignedAt DATETIME2(3) NOT NULL CONSTRAINT DF_UserRole_AssignedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT PK_UserRole PRIMARY KEY (UserId, RoleId),
    CONSTRAINT FK_UR_User FOREIGN KEY (UserId) REFERENCES dbo.[User](UserId) ON DELETE CASCADE,
    CONSTRAINT FK_UR_Role FOREIGN KEY (RoleId) REFERENCES dbo.Role(RoleId) ON DELETE CASCADE
);

-- Optional: Audit / Transactions table (example for deposits/withdrawals)
CREATE TABLE dbo.AccountTransaction (
    TransactionId BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    AccountId INT NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    TransactionType NVARCHAR(50) NOT NULL CONSTRAINT CK_AccountTransaction_Type CHECK (TransactionType IN ('Credit','Debit')),
    TransactionDate DATETIME2(3) NOT NULL CONSTRAINT DF_AccountTransaction_Date DEFAULT (SYSUTCDATETIME()),
    Note NVARCHAR(500) NULL,
    CONSTRAINT FK_Trans_Account FOREIGN KEY (AccountId) REFERENCES dbo.Account(AccountId) ON DELETE CASCADE
);

-- Indexes to support common queries
CREATE INDEX IX_Customer_Email ON dbo.Customer(Email);
CREATE INDEX IX_Account_CustomerId ON dbo.Account(CustomerId);
CREATE INDEX IX_Account_BranchId ON dbo.Account(BranchId);

PRINT 'DDL completed';
GO
