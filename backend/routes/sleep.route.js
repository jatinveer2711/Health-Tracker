import express from 'express';
import {createSleep,getSleep,updateSleep,deleteSleeplogs,} from '../controllers/sleep.controller.js'
import {verifyToken} from '../middleware/auth.middleware.js'
const router  = express.Router();

//crete 
router.post('/create',verifyToken,createSleep)

//get 
router.get('/getAll',verifyToken,getSleep)

//update
router.put('/update/:id',verifyToken,updateSleep)

//delete
router.delete('/delete/:id',verifyToken,deleteSleeplogs)


export default router;