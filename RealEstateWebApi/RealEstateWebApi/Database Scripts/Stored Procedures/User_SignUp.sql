CREATE PROCEDURE [dbo].[User_SignUp]
	@name VARCHAR(50),
	@last_name VARCHAR(50),
	@username VARCHAR(50),
	@password VARCHAR(100),
	@is_admin BIT

AS
BEGIN

	INSERT INTO [dbo].[User]
    (
		[name],
        [last_name],
		[username],
		[password],
		[date_of_joining],
		[is_admin]

	)
    VALUES
    (
	@name,
    @last_name,
    @username,
    @password,
	GETDATE(),
	@is_admin

	)
	SELECT SCOPE_IDENTITY();
 
END