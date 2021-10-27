
DELIMITER $$
create procedure insert_user(
	IN p_username varchar(100),
	IN p_password varchar(100),
    IN p_role enum('user', 'admin'),
	OUT result varchar(100))
BEGIN
DECLARE hashVariable blob;
SET hashVariable = aes_encrypt(p_password, (select secret from mydb.secret));

IF ((select username from user where username = p_username) IS NOT NULL)
THEN
SIGNAL SQLSTATE '45000'
SET message_text = "Username already exists";
END IF;

INSERT INTO user(username, password, role)

values(
	p_username,
	hashVariable,
	p_role);
    
    Select username into result from user where username = p_username;
select user_id from user where username = p_username;
END $$
DELIMITER ;