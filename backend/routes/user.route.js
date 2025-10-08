import express from 'express';
import {signup,login,logout} from '../controllers/user.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js'

const router = express.Router();

//signup route
router.post('/signup',signup);

//login route
router.post('/login',login);

//logout route
router.post('/logout',verifyToken,logout);

export default router;