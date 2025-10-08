import express from 'express';
import {verifyToken} from '../middleware/auth.middleware.js';
import { monthlyReport } from '../controllers/monthly.controller.js';

const router = express.Router();

router.get('/getAll',verifyToken,monthlyReport)

export default router;
