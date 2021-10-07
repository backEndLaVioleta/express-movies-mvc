import  Router from 'express';
import usersController from '../controllers/usersController.js';
import authHandler from '../middlewares/authHandler.js';
// import router from './moviesRoutes.js';

const userRoute = Router();
// Raul answer
// router.use(authHandler.encryptPassword);

userRoute.route('/').get(usersController.getAllUsers);

userRoute.route('/register')
.post(authHandler.encryptPassword)
.post(usersController.registerUser);

userRoute.route('/login').post(usersController.loginUser);

export default userRoute;