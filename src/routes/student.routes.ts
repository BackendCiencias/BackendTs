import { getStudents, createStudent, getStudentsById, getStudentsByDNI, signinStudent, createBulkStudents, modifyStudentData} from './../controllers/student.controller';
import { verifyToken, isSecretary} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/student/signup', [verifyToken, isSecretary], createStudent)
router.post('/api/student/signupbulk', [verifyToken, isSecretary], createBulkStudents)
router.post('/api/student/signin', signinStudent)
router.get('/api/student', [verifyToken, isSecretary], getStudents)
router.get('/api/student/:student_id', [verifyToken, isSecretary], getStudentsById)
router.post('/api/student/dni', [verifyToken, isSecretary], getStudentsByDNI)
router.post('/api/student/modify', [verifyToken, isSecretary], modifyStudentData);

export default router;
