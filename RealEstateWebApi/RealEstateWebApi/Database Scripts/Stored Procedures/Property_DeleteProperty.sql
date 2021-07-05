CREATE PROCEDURE [dbo].[Property_DeleteProperty]
	@property_id INT
AS
BEGIN

DELETE from [dbo].[Property] WHERE property_id = @property_id;

END