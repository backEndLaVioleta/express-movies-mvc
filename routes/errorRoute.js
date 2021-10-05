import Router from 'express';
import  HttpError  from 'http-errors';
const router = Router();

router.all('/', (req, res, next) =>{
    // res.json({result: 'No route available'})
    next(HttpError(404, {result: 'No route available'}))
});

export default router;