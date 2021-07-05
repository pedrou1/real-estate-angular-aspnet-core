CREATE PROCEDURE [dbo].[User_UpdateUser]
	@user_id int,
	@name VARCHAR(50),
	@last_name VARCHAR(50),
	@username VARCHAR(50),
	@password VARCHAR(100),
	@is_admin BIT
AS
BEGIN
	UPDATE [dbo].[User] 
	SET 
	 [name] = @name
	,[last_name]= @last_name
	,[username] = @username
	,[password] = @password
	,[is_admin] = @is_admin
	WHERE 
		[user_id] = @user_id
 
END