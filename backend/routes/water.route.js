import express from 'express';
import {createWaterintake,getWaterintake,updateWaterintake,deleteWaterintake} from '../controllers/water.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js'

const router = express.Router();

//create water intake

router.post('/create',verifyToken,createWaterintake);

// get water intake

router.get('/getAll',verifyToken,getWaterintake);

// update water intake

router.put('/update/:id',verifyToken,updateWaterintake);

//delete water intake

router.delete('/delete/:id',verifyToken,deleteWaterintake);


export default router;