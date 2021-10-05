import express from 'express';
import moviesRoutes from './routes/moviesRoutes.js';
import errorRoute from './routes/errorRoute.js'

const app = express();

app.use(express.json());
app.use('/movies', moviesRoutes);
app.use('/movies/:id', moviesRoutes);
app.use('*', errorRoute)

export default app;