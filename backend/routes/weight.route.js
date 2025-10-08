import express from 'express'
import {verifyToken} from '../middleware/auth.middleware.js'
import {getWeight,updateWeight,createWeight,deleteWeight} from  '../controllers/weight.controller.js'
const router = express.Router()

//create

router.post('/create',verifyToken,createWeight)

//get
router.get('/getAll',verifyToken,getWeight);

// update

router.put('/update/:id',verifyToken,updateWeight);

// delete

router.delete('/delete/:id',verifyToken,deleteWeight)

export default router;