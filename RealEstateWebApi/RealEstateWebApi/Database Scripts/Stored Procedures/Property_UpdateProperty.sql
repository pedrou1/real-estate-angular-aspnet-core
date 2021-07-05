CREATE PROCEDURE [dbo].[Property_UpdateProperty]
	@property_id INT,
	@property_type VARCHAR(300),
	@description VARCHAR(300),
	@city VARCHAR(50),
	@address VARCHAR(100),
	@total_bedrooms VARCHAR(2),
	@total_area_m2 VARCHAR(4),
	@photo_file_name VARCHAR(100),
	@price INT
AS
BEGIN
	UPDATE [dbo].[Property] 
	SET 
        [property_type] = @property_type
        ,[description] = @description
        ,[address] = @address
        ,[city] = @city
        ,[total_bedrooms] = @total_bedrooms
        ,[total_area_m2] = @total_area_m2
        ,[photo_file_name] = @photo_file_name
	,[price] = @price
	WHERE 
		property_id = @property_id
 
END