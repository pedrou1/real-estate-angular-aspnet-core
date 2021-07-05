CREATE PROCEDURE [dbo].[User_GetUsers]
AS
BEGIN

SELECT [user_id] AS user_id
      ,[name] AS name
      ,[last_name] AS last_name
      ,[username] AS username
	,[password] AS password
      ,[is_admin] AS is_admin
	    FROM [dbo].[User] 
  WHERE is_deleted = 0;

END