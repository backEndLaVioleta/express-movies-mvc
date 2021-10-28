
use movies;
 -- USER TABLE
 drop table user;
 
 create table user(
 user_id int primary key not null auto_increment,
 username varchar(45) not null,
 password blob not null,
 role enum('user', 'admin') default 'user'
 );
 SELECT * from user;
 insert into user (username, password) values ('Paco', '1234');