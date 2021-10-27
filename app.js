import express from 'express';
import moviesRoutes from './routes/moviesRoutes.js';
import usersRoutes from './routes/usersRoutes.js'
import errorRoute from './routes/errorRoute.js'
import {clientErrorHandler, genericErrorHandler, clientErrorHandlerSql} from './middlewares/errorHandler.js';

// import dotenv from 'dotenv';
// npm i dotenv
// todo lo que necesitamos que sea secreto se escribirá en el fiche  .env
// situado en el directorio raiz
// dotenv.config()

const app = express();

app.use(express.json());
app.use('/movies', moviesRoutes);
// app.use('/movies/:id', moviesRoutes);

// users
app.use('/users', usersRoutes);
// app.use('/users/register', usersRoutes);
// app.use('/users/login', usersRoutes);
app.use('*', errorRoute)

app.use(clientErrorHandler);
app.use(clientErrorHandlerSql);
app.use(genericErrorHandler);
export default app;