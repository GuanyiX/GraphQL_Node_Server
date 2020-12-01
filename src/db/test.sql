CREATE TABLE IF NOT EXISTS `clients` (
	`clientId` varchar(10) NOT NULL,
	`firstName` varchar(255) NOT NULL
);

DELIMITER $$
DROP PROCEDURE IF EXISTS dowhile$$
CREATE PROCEDURE dowhile()
BEGIN
DECLARE v1 INT DEFAULT 0;
DECLARE name VARCHAR(255);
WHILE v1 <=5 DO
SET name := lpad(conv(floor(rand()*pow(36,8)), 10, 36), 8, 0);
INSERT INTO clients (clientId, firstName) VALUES (v1, name);
SET v1 = v1 + 1;
END WHILE;
END$$
DELIMITER ;

call dowhile();

