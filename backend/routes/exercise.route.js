import express from 'express';
import {createExercide,getAllExercise,updateExersice,deleteExercise} from '../controllers/exercise.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';

const router = express.Router();

//create exercise 
router.post('/create',verifyToken,createExercide);

//get all exerscise

router.get('/getAll',verifyToken,getAllExercise);

//update exercise 

router.put('/update/:id',verifyToken,updateExersice);

//delete exercise

router.delete('/delete/:id',verifyToken,deleteExercise);



export default router;