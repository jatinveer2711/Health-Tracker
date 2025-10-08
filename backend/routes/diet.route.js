import express from 'express';
import {createDiet,getAlldiet,updateDiet,deleteDiet} from '../controllers/diet.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

//create diet 

router.post('/create',verifyToken,createDiet)
//get all diet
router.get('/getAll',verifyToken,getAlldiet)

//update diet
router.put('/update/:id',verifyToken,updateDiet)

//delete diet
router.delete('/delete/:id',verifyToken,deleteDiet)

export default router;