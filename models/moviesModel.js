import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';
import  HttpError  from 'http-errors';
import  json  from 'express';
class MoviesModel{
   
    // GET
   async getMovies(req, res, next){

      try {
          const result = await connection.query(
            'select * from movie'
           
          )
          return result;
      } catch (error) {
          console.log(error);
          next(HttpError(400, {message:error.message}))
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
            const createMovie = await connection.query(
                'insert into movie( title, poster, synopsis, genres_id, year, director, actors) values (?, ?, ?, ?, ? ,?, ?)',
                [ obj.title, obj.poster, obj.synopsis, obj.genres, obj.year, obj.director, obj.actors]);
                  
                
            return createMovie;
        } catch (error) {
            console.log(error)
        }
    }
    // PUT

   async putMovies(id, movie){
       
    try {
        
        const sql =  'UPDATE `movie` SET   `title` = ?, `poster` = ?, `synopsis` = ?, `genres_id` = ?, year = ?, `director` = ?, `actors` = ? WHERE `movie_id` = ?';
        const updateMovie = await connection.query(
           sql, [ movie.title, movie.poster, movie.synopsis, movie.genres_id, movie.year, movie.director, movie.actors, id] 
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