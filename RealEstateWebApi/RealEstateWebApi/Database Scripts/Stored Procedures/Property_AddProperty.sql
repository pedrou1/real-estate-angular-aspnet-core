CREATE PROCEDURE [dbo].[Property_AddProperty]
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

	INSERT INTO [dbo].[Property]
    (
	[property_type],
	[description],
	[city],
	[address],
	[total_bedrooms],
	[total_area_m2] ,
	[photo_file_name],
	[price]
	)
    VALUES
    (
	@property_type,
	@description,
	@city,
	@address,
	@total_bedrooms,
	@total_area_m2,
	@photo_file_name,
	@price
	)
	SELECT SCOPE_IDENTITY();
END