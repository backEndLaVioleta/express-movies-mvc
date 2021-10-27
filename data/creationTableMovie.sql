create database movies;
use movies;
select * from movie;
create table movie(
movie_id int unsigned not null auto_increment primary key,
title varchar(100) not null,
poster varchar(100) not null,
synopsis varchar(4000) not null,
genres varchar(100) not null,
year int not null,
director varchar(100) not null,
actors  varchar(1000) not null);

insert into movie(movie_id, title, poster, synopsis, genres, year, director, actors) 
select id, title, poster, synopsis, genres, year, director, actors from movies.movies;
select * from movie;
drop table movies;