-- create database movies;
use movies;
drop table movie;
create table movie(
movie_id int not null primary key auto_increment,
title varchar(100) not null,
poster varchar(100),
synopsis varchar(4000),
genres_id varchar(45),
year varchar(4),
director varchar(100),
actors json);

insert into movie(movie_id, title, poster, synopsis, genres_id, year, director, actors) 
	   select id, title, poster, synopsis, genres, year, director, actors from movies.movies;

select * from movie;
 drop table movies;      
 


-- TABLA DE USUARIO
drop table user;
create table user(
user_id int primary key not null auto_increment,
username varchar(45) not null,
pass_word blob not null,
role enum('user','admin') default 'user'
);


-- TABLA PARA GUARDAR LA PALABRA SECRETA

create table secret(
secret blob not null);

insert into secret values(UNHEX(SHA2('mysecret',512)));


-- esto no funciona
INSERT INTO user(username, pass_word) VALUES ('Paco','1234');
select * from user;
-- esto no funciona: no se pueden crear variables globales customizadas.
-- SET GLOBAL SECRET = UNHEX(SHA2('mysecret',512));

drop procedure insert_user;

DELIMITER $$
CREATE PROCEDURE insert_user(
p_username varchar(100),
p_password varchar(100),
p_role enum('user','admin'))
BEGIN

insert into user(user_id,username,pass_word,role) values(default, p_username, AES_ENCRYPT(p_password, (select secret from secret)),p_role);

 select user_id  from user where username = p_username;
commit;
END$$
DELIMITER ;

call insert_user('Paco','1234','user');


-- SELECT OBTENER PASSWORD DESENCRIPTADA
select CAST(AES_DECRYPT(pass_word, (select secret from secret)) AS CHAR(10000) CHARACTER SET utf8mb4) from user;


-- FUNCIÓN DE COMPARACIÓN DE PASSWORDS;
SET GLOBAL log_bin_trust_function_creators = 1;

drop function check_user;

DELIMITER $$
CREATE FUNCTION check_user(
p_username varchar(100),
p_password varchar(100))
RETURNS tinyint
NOT deterministic
BEGIN
   declare decrypt_password varchar(100);
   select CAST(AES_DECRYPT(pass_word, (select secret from secret)) AS CHAR(10000) CHARACTER SET utf8mb4) into decrypt_password from user
   where username = p_username;
	
	IF(decrypt_password != p_password or decrypt_password IS NULL) THEN 
			SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'Password not found';
	
	END IF;
    
    RETURN 1;
END$$
DELIMITER ;

select CAST(AES_DECRYPT(pass_word, (select secret from secret)) AS CHAR(10000) CHARACTER SET utf8mb4) from user
   where username = 'Pao';
select check_user('Paco','1234');
select * from user;