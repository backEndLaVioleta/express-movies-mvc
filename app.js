import express from 'express';
import moviesRoutes from './routes/moviesRoutes.js';
import usersRoutes from './routes/usersRoutes.js'
import errorRoute from './routes/errorRoute.js'
import clientErrorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/movies', moviesRoutes);
app.use('/movies/:id', moviesRoutes);
// users
app.use('/users', usersRoutes);
app.use('/users/signup', usersRoutes);
app.use('/users/login', usersRoutes);
app.use('*', errorRoute)

app.use(clientErrorHandler);

export default app;