import moviesModel from '../models/moviesModel.js';
import  HttpError  from 'http-errors';
import movies from '../data/movies.js';
// movies controller handles all http methods
// gestion de las peticiones
// GET
const getAllMovies = async (req,res) =>{
    try {
    const movies = await moviesModel.getMovies();
    res.json(movies).status(200);
    } catch (error) {
        next(HttpError(400, {messsage: 'No database available'}));
    }
    
    
}
// GET ONE
const getOneMovie = async (req, res, next) =>{
try {
    
    // que exista el id
    if(!req.params.id)
        // si no hay id patada adelante con error
        next(HttpError(400, {message: "No ID found"}));
    
    const id = req.params.id;
    const movie = await moviesModel.getOne(id);
    res.json(movie).status(201);
   
} catch (error) {
    console.log(error);
    next(HttpError(400, {message: error.message}));
}

}

// POST
const postMovie = async (req, res, next) =>{
    try {
        const { title, poster, synopsis, genres = [], year, director, actors = []} = req.body;
    // const id = req.params;
    const movie = req.body;
    console.log(movie);
    // movies
    // const movies =  moviesModel.getMovies();
    // tell me if there is any equal to it and then jump
    // const findOne = movies.find((el) => (el.id) == (movie.id));
    const findOne = await moviesModel.checkMovies(movie);
    console.log(findOne);
    if(findOne == undefined) {
       const newMovie = await moviesModel.postMovies(movie);
        res.status(201).json(newMovie);
       
    } else {
        res.status(400).send('Movie already in the DDBB');
    }                       
   
    } catch (error) {
        next(HttpError(400, {message:error.message}));
    }
    
}

// PUT
// const putMovie = (req, res)=>{
//     const id = req.params.id;
//     const movieIndex = moviesModel.putMovies(id);
//     // returns -1 when is no a match
//     if(movieIndex < 0) 
//     res.status(400).json({result:`The movie with id: ${id} is not in the DDBB`});
// 
//     const newMovie = {...movies[movieIndex],...req.body}
//     console.log(newMovie);
//     movies.splice(movieIndex, 1, newMovie);
//     res.json(movies[movieIndex]).status(200);
// 
// }
const putMovie = async (req, res, next)=>{

    try {
        const id = req.params.id;

        const movie = await moviesModel.getOne(id);
        console.log(movie);

        const updateMe = await moviesModel.putMovies(movie);
        console.log(updateMe);
        

    } catch (error) {
        next(HttpError(400, {message: error.message}));
    }
}
// DELETE
//const deleteOneMovie = (req, res) =>{
//    const id = req.params.id;
//    const deleteMe = moviesModel.deleteMovies(id);
//    const movies = moviesModel.getMovies(); 
//    if(!isNaN(deleteMe)){
//    res.status(404).send(`Movie with the id: ${id} no in the DDBB`);
//    res.status(404).json({result:`Movie with the id: ${id} no in the DDBB` });
//    }
//    res.json(movies).status(200).send(`Movie with the id: ${id} has been deleted from the DDBB`);
//    res.status(200).json({result:`Movie with the id: ${id} has been deleted from the DDBB` });
//}
const deleteOneMovie = async (req, res, next) =>{
    try {
        const id = req.params.id;

        const deleteMe = await moviesModel.deleteMovies(id);
        
        (deleteMe.affectedRows == 0) ? res.json({result:'Movie not in the DDBB'}).status(200):
                                       res.json({result:'Movie deleted from the DDBB'}).status(200);
    } catch (error) {
        next(HttpError(404, {message:error.message}));
    }
}

export default {
    getAllMovies,
    postMovie,
    getOneMovie,
    deleteOneMovie,
    putMovie
}