import { getStudents, createStudent, getStudentsById, getStudentsByDNI } from './../controllers/student.controller';
import { verifyToken, isSecretary} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/student/signup', [verifyToken, isSecretary], createStudent)
router.get('/api/student', [verifyToken, isSecretary], getStudents)
router.get('/api/student/:student_id', [verifyToken, isSecretary], getStudentsById)
router.post('/api/student/dni', [verifyToken, isSecretary], getStudentsByDNI)

export default router;
