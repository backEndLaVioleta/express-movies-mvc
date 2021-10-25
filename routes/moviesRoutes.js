import express, { Router } from 'express';
import moviesController from '../controllers/moviesController.js';
import authHandler from '../middlewares/authHandler.js';
const movieRoutes = express.Router();
// refac
const router = Router();


router.route('/')
            .get(moviesController.getAllMovies)
            .get(moviesController.getOneMovie)
            .all(authHandler.authUser) // metodo de express 
            .post(moviesController.postMovie)

router.route('/:id')
                    .get(moviesController.getOneMovie)
                    .all(authHandler.authUser)
                    .put(moviesController.putMovie)
                    .delete(moviesController.deleteOneMovie)

// movieRoutes.get('/', moviesController.getAllMovies);
// movieRoutes.get('/:id', moviesController.getOneMovie);
// movieRoutes.post('/', moviesController.postMovie);
// movieRoutes.delete('/:id', moviesController.deleteOneMovie);

// export default movieRoutes;
export default router;