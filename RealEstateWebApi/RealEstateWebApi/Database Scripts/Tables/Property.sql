CREATE TABLE [Property] (
[property_id] INT IDENTITY(1,1) PRIMARY KEY,
[property_type] VARCHAR(50) NOT NULL,
[description] VARCHAR(300) NOT NULL,
[city] VARCHAR(50) NOT NULL,
[address] VARCHAR(100) NOT NULL,
[total_bedrooms] VARCHAR(2) NOT NULL,
[total_area_m2] VARCHAR(4),
[photo_file_name] VARCHAR(100) NOT NULL,
[price] INT NOT NULL,
)