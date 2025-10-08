import { getDashboard } from "../controllers/dashboard.controller.js";
import express from 'express'
import {verifyToken} from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/getAll',verifyToken,getDashboard)

export default router;