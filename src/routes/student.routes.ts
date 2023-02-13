import { getStudents, createStudent } from './../controllers/student.controller';
import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/student/signup', verifyToken, createStudent)
router.get('/api/student', verifyToken, getStudents)

export default router;
