import express, { Router } from 'express';
import moviesController from '../controllers/moviesController.js';
import authHandler from '../middlewares/authHandler.js';
const movieRoutes = express.Router();
// refac
const router = Router();


router.route('/')
            .get(moviesController.getAllMovies)
            .post(moviesController.postMovie)
          //.put(moviesController.putMovie)
          //.delete(moviesController.deleteOneMovie)
           // .all(authHandler.authUser) // metodo de express 
            

 router.route('/:id')
                    .get(moviesController.getOneMovie)
                    .put(moviesController.putMovie)
                    .delete(moviesController.deleteOneMovie) 
                    // .all(authHandler.authUser)
                    // .put(moviesController.putMovie)
                    // .delete(moviesController.deleteOneMovie) 

// movieRoutes.get('/', moviesController.getAllMovies);
// movieRoutes.get('/:id', moviesController.getOneMovie);
// movieRoutes.post('/', moviesController.postMovie);
// movieRoutes.delete('/:id', moviesController.deleteOneMovie);

// export default movieRoutes;
export default router;