-- Prepares MYSQL server for the project

-- Sets the password policy level to LOW
SET GLOBAL validate_password.policy=LOW;

-- Delete old database, user and create new one
DROP DATABASE IF EXISTS client_cap_db;
CREATE DATABASE IF NOT EXISTS client_cap_db;
CREATE USER IF NOT EXISTS 'client_cap'@'localhost' IDENTIFIED BY 'client_cap_pwd';
GRANT ALL PRIVILEGES ON `client_cap_db`.* TO 'client_cap'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'client_cap'@'localhost';
FLUSH PRIVILEGES;
