import express, { Router } from 'express';
import moviesController from '../controllers/moviesController.js';
const movieRoutes = express.Router();
// refac
const router = Router();

router.route('/movies')
            .get(moviesController.getAllMovies)
            .post(moviesController.getOneMovie)

router.route('/:id').get(moviesController.getOneMovie)

movieRoutes.get('/', moviesController.getAllMovies);
movieRoutes.get('/:id', moviesController.getOneMovie);
movieRoutes.post('/', moviesController.postMovie);
movieRoutes.delete('/:id', moviesController.deleteOneMovie);

export default movieRoutes;