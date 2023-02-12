import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();
import {createStudent} from '../controllers/student.controller'

router.post('/api/student/signup', verifyToken, createStudent)

export default router;
