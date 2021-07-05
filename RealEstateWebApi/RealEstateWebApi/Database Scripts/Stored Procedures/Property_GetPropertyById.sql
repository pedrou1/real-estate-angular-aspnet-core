CREATE PROCEDURE [dbo].[Property_GetPropertyById]
	@property_id INT
AS
BEGIN

SELECT 
[property_id] AS property_id
,[property_type] AS property_type
,[description] AS description
,[city] AS city
,[address] AS address
,[total_bedrooms] AS total_bedrooms
,[total_area_m2] AS total_area_m2
,[photo_file_name] AS photo_file_name
,[price] AS price
FROM [dbo].[Property]
WHERE property_id = @property_id

END