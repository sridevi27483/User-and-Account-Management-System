-- Create table for Banks
CREATE TABLE Bank (
    BankId INT PRIMARY KEY IDENTITY(1,1),
    BankName VARCHAR(100) NOT NULL,
    HeadOfficeLocation VARCHAR(100)
);

-- Create table for Branches
CREATE TABLE Branch (
    BranchId INT PRIMARY KEY IDENTITY(1,1),
    BranchName VARCHAR(100) NOT NULL,
    Location VARCHAR(100),
    BankId INT FOREIGN KEY REFERENCES Bank(BankId)
);

-- Create table for Users
CREATE TABLE [User] (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    UserType VARCHAR(50) CHECK (UserType IN ('Normal', 'Bank')),
    CreatedDate DATETIME DEFAULT GETDATE()
);

-- Create table for Accounts
CREATE TABLE Account (
    AccountId INT PRIMARY KEY IDENTITY(1,1),
    AccountType VARCHAR(50) CHECK (AccountType IN ('Saving', 'Current', 'Term Deposit')),
    Balance DECIMAL(15,2) DEFAULT 0,
    Currency VARCHAR(10) DEFAULT 'INR',
    Status VARCHAR(20) DEFAULT 'Active',
    UserId INT FOREIGN KEY REFERENCES [User](UserId),
    BranchId INT FOREIGN KEY REFERENCES Branch(BranchId)
);

-- Create table for Roles
CREATE TABLE Role (
    RoleId INT PRIMARY KEY IDENTITY(1,1),
    RoleName VARCHAR(50) NOT NULL
);

-- Create table for Permissions
CREATE TABLE Permission (
    PermissionId INT PRIMARY KEY IDENTITY(1,1),
    PermissionName VARCHAR(100) NOT NULL
);

-- Link table for Role-Permission
CREATE TABLE RolePermission (
    RoleId INT FOREIGN KEY REFERENCES Role(RoleId),
    PermissionId INT FOREIGN KEY REFERENCES Permission(PermissionId),
    PRIMARY KEY (RoleId, PermissionId)
);

-- Link table for User-Role
CREATE TABLE UserRole (
    UserId INT FOREIGN KEY REFERENCES [User](UserId),
    RoleId INT FOREIGN KEY REFERENCES Role(RoleId),
    PRIMARY KEY (UserId, RoleId)
);
