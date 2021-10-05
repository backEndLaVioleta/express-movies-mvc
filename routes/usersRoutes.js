import  Router from 'express';
import usersController from '../controllers/usersController.js';

const userRoute = Router();

userRoute.route('/').get(usersController.getAllUsers);

export default userRoute;