CREATE PROCEDURE [dbo].[User_SignIn]
	@username varchar(50),
	@password varchar(50)

AS
BEGIN

	DECLARE @userCorrect INT;

	SET @userCorrect = (SELECT count(*) FROM [dbo].[User] WHERE [username] = @username and [password] = @password and [is_deleted] = 0);

	if(@userCorrect > 0)
		begin
			SELECT [user_id] AS user_id
					,[is_admin] AS is_admin
			  FROM [dbo].[User] 
			  WHERE [username] = @username AND [password] = @password AND is_deleted = 0;	
		 end
	 else
		 begin
		 SELECT @userCorrect as user_id, 0 as is_admin
		 end
END