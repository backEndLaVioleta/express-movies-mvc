 import movies from '../data/movies.js';
//import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';
import  HttpError  from 'http-errors';
import  json  from 'express';
class MoviesModel{
    // all logic of the movies go in HERE
    // trata con los datos req res

    // get
   /*  getMovies(){
        return movies;        
    } */
   async getMovies(req, res, next){

      try {
          const result = await connection.query(
            'select * from movie'
            // mejor escribir todos los campos necesarios
          )
          return result;
      } catch (error) {
          console.log(error);
          next(HttpError(400, {message:error.message}))
      } 
    }
    // get one
    /* getOne(num){
         const findMe = movies.find((el) => el.id == num);
         return findMe;
    } */

    async getOne(num){
try {
    
    const findMe = await connection.query(
        'select * from movie where movie_id = ?',[num],
        (error, result)=>{
            console.log(result);
            const findMe = movies.find((el) => el.id == result)
        })
    
    return findMe;
} catch (error) {
    console.log(error)
}

    }
    // post
    /* postMovies(obj){
        return movies.push(obj);
    } */
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
        throw new Error(error.message);
        
    }
    }
    //delete
    // deleteMovies(num){
       //  const findMyIndex = movies.findIndex((el) => el.id == num);
       //  let eraseMe;
       //  (findMyIndex < 0) ? eraseMe = num : eraseMe = movies.splice(findMyIndex, 1);
       //  return eraseMe;

    // }
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
    /* checkMovies(obj){
        return  movies.some((el)=> el.id == obj.id);
    } */
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
            throw new Error(error);
        }
    }
   
}

export default new MoviesModel()