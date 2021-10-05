import express from 'express';
import moviesController from '../controllers/moviesController.js';
const movieRoutes = express.Router();


movieRoutes.get('/', moviesController.getAllMovies);
movieRoutes.get('/:id', moviesController.getOneMovie);
movieRoutes.post('/', moviesController.postMovie);
movieRoutes.delete('/:id', moviesController.deleteOneMovie);

export default movieRoutes;