CREATE PROCEDURE [dbo].[User_GetUserById]
	@user_id INT
AS
BEGIN

SELECT [user_id] AS user_id
      ,[name] AS name
      ,[last_name] AS last_name
      ,[username] AS username
      ,[is_admin] AS is_admin
	,[date_of_joining] as date_of_joining
	    FROM [dbo].[User] 
  WHERE [user_id] = @user_id and is_deleted = 0;

END