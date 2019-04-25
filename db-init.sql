-- This file need only be imported once, by a high-level user.
-- This operation will create the users necessary for operating and testing the server.

--
-- Create Databases If They Don't Exist
--

CREATE DATABASE IF NOT EXISTS alexa_lampi;
CREATE DATABASE IF NOT EXISTS alexa_lampi_testing;

--
-- Create Server User
--

FLUSH PRIVILEGES;

-- Create General Server User
DROP USER IF EXISTS 'alexa_lampi_server'@'localhost';
CREATE USER 'alexa_lampi_server'@'localhost' IDENTIFIED WITH mysql_native_password BY '8237OIULB$@(IEOiuef2';
GRANT CREATE, INSERT, SELECT, UPDATE, DELETE ON alexa_lampi.* TO 'alexa_lampi_server'@'localhost';

-- Create Testing DB Import User
DROP USER IF EXISTS 'importer'@'localhost';
CREATE USER 'importer'@'localhost' IDENTIFIED WITH mysql_native_password BY 'importer';
GRANT ALL ON alexa_lampi_testing TO 'importer'@'localhost';
GRANT ALL ON alexa_lampi_testing.* TO 'importer'@'localhost';

-- Create Testing DB Server User (separate from import user so that it can have the same permissions as the general server user)
DROP USER IF EXISTS 'alexa_lampi_server_testing'@'localhost';
CREATE USER 'alexa_lampi_server_testing'@'localhost' IDENTIFIED WITH mysql_native_password BY '*O&hbio4FOSR4o8w4iubs(&H$';
GRANT CREATE, INSERT, SELECT, UPDATE, DELETE ON alexa_lampi_testing.* TO 'alexa_lampi_server_testing'@'localhost';

FLUSH PRIVILEGES;