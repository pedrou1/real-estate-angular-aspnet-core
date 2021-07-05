CREATE PROCEDURE [dbo].[User_DeleteUser]
	@user_id INT
AS
BEGIN

UPDATE [User] SET [is_deleted] = 1 WHERE user_id = @user_id;

END