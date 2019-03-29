-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName.TableName', 'U') IS NOT NULL
DROP TABLE SchemaName.TableName
GO
-- Create the table in the specified schema
CREATE TABLE Company
(
  CompanyID INT NOT NULL PRIMARY KEY, -- primary key column
  CompanyName VARCHAR(50) NOT NULL,
  IsActive Boolean NOT NULL
  -- specify more columns here
);
GO
CREATE TABLE PageCategory
(
  PageCategoryID INT NOT NULL PRIMARY KEY,
  PageCategoryName VARCHAR(50) NOT NULL,
  IsActive Boolean NOT NULL
);
GO
CREATE TABLE Url(
  UrlID INT NOT NULL PRIMARY KEY,
  UrlDetail VARCHAR(300) NOT NULL,
  PageCategoryID,
  CompanyID
);
GO