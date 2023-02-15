import { getStudents, createStudent, getStudentsById, getStudentsByDNI } from './../controllers/student.controller';
import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/student/signup', verifyToken, createStudent)
router.get('/api/student', verifyToken, getStudents)
router.get('/api/student/:student_id', verifyToken, getStudentsById)
router.post('/api/student/dni', verifyToken, getStudentsByDNI)

export default router;
