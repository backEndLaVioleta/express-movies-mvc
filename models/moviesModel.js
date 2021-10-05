import movies from '../data/movies.js';

class MoviesModel{
    // all logic of the movies go in HERE
    // trata con los datos req res

    // get
    getMovies(){
        return movies;        
    }
    // get one
    getOne(num){
        const findMe = movies.find((el) => el.id == num);
        return findMe;
    }
    // post
    postMovies(obj){
        return movies.push(obj);
    }
    // put 
    putMovies(num){
        const findOneToUpdate = movies.find((el) => el.id == num);
        if(findOneToUpdate != undefined)
        return findOneToUpdate;
    }
    //delete
    deleteMovies(num){
        const findMyIndex = movies.findIndex((el) => el.id == num);
        let eraseMe;
        (findMyIndex < 0) ? eraseMe = num : eraseMe = movies.splice(findMyIndex, 1);
        return eraseMe;

    }
   
}

export default new MoviesModel()