 import movies from '../data/movies.js';
//import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';

class MoviesModel{
    // all logic of the movies go in HERE
    // trata con los datos req res

    // get
   /*  getMovies(){
        return movies;        
    } */
   async getMovies(){

      try {
          const result = await connection.query(
            'select * from movie'
            // mejor escribir todos los campos necesarios
          )
          return result;
      } catch (error) {
          console.log(error);
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
    postMovies(obj){
       // return movies.push(obj);
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
   
}

export default new MoviesModel()