 import movies from '../data/movies.js';
//import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';
import  HttpError  from 'http-errors';
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
            const createMovie = await connection.query(
                'insert into movie(id, title, poster, synopsis, genres, year, director, actors) = ?',
                [obj.title, obj.poster, obj.synopsis, obj.genres, obj.year, obj.director, obj.actors],
                (error, result)=>{
                    return movies.push(result);
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    // put 
    putMovies(num){
       // const findIndex = movies.findIndex((el) => el.id == num);
       // return findIndex;
        
    }
    //delete
    deleteMovies(num){
       // const findMyIndex = movies.findIndex((el) => el.id == num);
       // let eraseMe;
       // (findMyIndex < 0) ? eraseMe = num : eraseMe = movies.splice(findMyIndex, 1);
       // return eraseMe;

    }

    // aux functions
    /* checkMovies(obj){
        return  movies.some((el)=> el.id == obj.id);
    } */
    async checkMovies(obj){
        try {
            // query
            const checkMe = await connection.query(
                'select * from movie where movie_id = ?',[obj.id],
                (error, result)=>{
                    const findMe = movies.some((el) => el.id == result)
                });
            
            return checkMe;
        } catch (error) {
            console.log(error);
        }
    }
   
}

export default new MoviesModel()