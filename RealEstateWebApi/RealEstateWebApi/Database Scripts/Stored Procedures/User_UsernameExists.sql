CREATE PROCEDURE [dbo].[User_UsernameExists]
	@username varchar(50)

AS
BEGIN

DECLARE @userExists INT;

SET @userExists = (SELECT count(*) FROM [dbo].[User] WHERE username = @username);

RETURN @userExists;

END