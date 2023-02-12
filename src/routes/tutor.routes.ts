import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();
import {createTutor} from '../controllers/tutor.controller'

router.post('/api/tutor/signup', verifyToken, createTutor)

export default router;
