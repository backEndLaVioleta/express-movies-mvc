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

select * from movies;
 drop table movies;      