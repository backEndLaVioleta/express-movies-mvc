import  Router from 'express';
import usersController from '../controllers/usersController.js';

const userRoute = Router();

userRoute.route('/').get(usersController.getAllUsers);

userRoute.route('/register').post(usersController.registerUser);

userRoute.route('/login').post(usersController.loginUser);

export default userRoute;