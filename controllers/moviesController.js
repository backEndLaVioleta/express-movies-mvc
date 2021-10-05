import moviesModel from '../models/moviesModel.js';
// movies controller handles all http methods
// gestion de las peticiones
// GET
const getAllMovies = (req,res) =>{
    const movies = moviesModel.getMovies();
    res.json(movies).status(200);
    res.status(500).send('DDBB of movies not found!')
    
}
// GET ONE
const getOneMovie = (req, res) =>{
    const id = req.params.id;
    const movie = moviesModel.getOne(id);
    res.json(movie).status(201);
    res.status(404).send('Movie already in the DDBB');
}

// POST
const postMovie = (req, res) =>{
    const {id, title, poster, synopsis, genres = [], year, director, actors = []} = req.body;
    // const id = req.params;
    const movie = {
        id,
        title,
        poster,
        synopsis,
        genres,
        year, 
        director,
        actors
    };
    // movies
    const movies = moviesModel.getMovies();
    // tell me if there is any equal to it and then jump
    const findOne = movies.find((el) => (el.id) == (movie.id));
    console.log(findOne);
    (findOne) ? res.status(400).send('Movie already in the DDBB') :
                moviesModel.postMovies(movie);
    res.status(201).json(movie);
}

// PUT
const putMovie = (req, res)=>{

}
// DELETE
const deleteOneMovie = (req, res) =>{
    const id = req.params.id;
    const deleteMe = moviesModel.deleteMovies(id);
    const movies = moviesModel.getMovies(); 
    if(!isNaN(deleteMe)){
        res.status(404).send(`Movie with the id: ${id} no in the DDBB`);
    res.status(404).json({result:`Movie with the id: ${id} no in the DDBB` });
    }
    res.json(movies).status(200).send(`Movie with the id: ${id} has been deleted from the DDBB`);
    res.status(200).json({result:`Movie with the id: ${id} has been deleted from the DDBB` });
}

export default {
    getAllMovies,
    postMovie,
    getOneMovie,
    deleteOneMovie
}