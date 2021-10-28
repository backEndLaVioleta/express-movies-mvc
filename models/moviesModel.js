import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';
import  HttpError  from 'http-errors';
import  json  from 'express';
class MoviesModel{
   
    // GET
   async getMovies(){

      try {
          const result = await connection.query(
            'select * from movie'
           
          )
          return result;
      } catch (error) {
          console.log(error);
        throw error;
      } 
    }

    // GET
    async getOne(num){

        try {

            const findMe = await connection.query(
                'select * from movie where movie_id = ?',[num]);
            return findMe;
            
        } catch (error) {
        
            console.log(error);
            throw error;
        }

    }
   
    // POST
    async postMovies(obj){
        try {
            const sqlRaul =  'insert into movie( title, poster, synopsis, genres_id, year, director, actors) values (?, ?, ?, ?, ? ,?, ?)';
            const sqlCasa =  'insert into movie( title, poster, synopsis, genres, year, director, actors) values (?, ?, ?, ?, ? ,?, ?)';
            const createMovie = await connection.query(
               sqlCasa, [ obj.title, obj.poster, obj.synopsis, obj.genres, obj.year, obj.director, obj.actors]);
                   // return movies.push(result);
                
            return createMovie;
        } catch (error) {
            console.log(error)
        }
    }
    // put 
    /* putMovies(num){
        const findIndex = movies.findIndex((el) => el.id == num);
        return findIndex;
        
    } */
   async putMovies(movie){
    try {
        const sql =  'UPDATE movie SET `title` = ?, `poster` = ?, `synopsis` = ?, `genres_id` = ?, `year` = ?, `director` = ?, `actors` = ? WHERE `movie_id` = ?';
        const sqlCasa =  'UPDATE movie SET `title` = ?, `poster` = ?, `synopsis` = ?, `genres` = ?, `year` = ?, `director` = ?, `actors` = ? WHERE `movie_id` = ?';
        
        const updateMovie = await connection.query(
           sqlCasa, [movie.title, movie.poster, movie.synopsis, movie.genres_id, movie.year, movie.director, movie.actors, movie.movie_id] 
        );
        console.log(updateMovie);
        
        return updateMovie;

    } catch (error) {
        throw error;
        
    }
    }
    // DELETE
    async deleteMovies(num){
        try {
            const deleteMovie = await connection.query(
                'DELETE from movie where movie_id = ?', [num]
            );
            
            return deleteMovie;
        } catch (error) {
            throw new Error(error.message);
            
        }
    }
    // aux functions
    async checkMovies(movie){
        try {
            // query
            const checkMe = await connection.query(
                'select * from movie where title = ? and director = ?',[movie.title, movie.director])
                console.log(checkMe[0]);
                return checkMe[0];
        
        } catch (error) {
            error = 'Movie not checked';
            console.log(error);
            throw error;
        }
    }
   
}

export default new MoviesModel()