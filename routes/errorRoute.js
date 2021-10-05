import Router from 'express';

const router = Router();

router.all('/', (req, res) =>{
    res.json({result: 'No route available'})
});

export default router;