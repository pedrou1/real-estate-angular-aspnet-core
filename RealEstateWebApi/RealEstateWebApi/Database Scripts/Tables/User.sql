CREATE TABLE [User] (
[user_id] INT IDENTITY(1,1) PRIMARY KEY,
[name] VARCHAR(50) NOT NULL,
[last_name] VARCHAR(50) NOT NULL,
[username] VARCHAR(50) NOT NULL,
[password] VARCHAR(100) NOT NULL,
[date_of_joining] DateTime NOT NULL,
[is_admin] BIT CONSTRAINT [DF_IsAdmin] DEFAULT ((0)) NOT NULL,
[is_deleted] BIT CONSTRAINT [DF_IsDeleted] DEFAULT ((0)) NOT NULL,

CONSTRAINT [UN_Username] UNIQUE ([username])
)