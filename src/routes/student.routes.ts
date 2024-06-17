import { getStudents, createStudent, getStudentsById, getStudentsByParamId, getStudentsByDNI, signinStudent, createBulkStudents, modifyStudentData, modifyStudentImage} from './../controllers/student.controller';
import { verifyToken} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/student/signup', [verifyToken], createStudent)
router.post('/api/student/signupbulk', [verifyToken], createBulkStudents)
router.post('/api/student/signin', signinStudent)
router.get('/api/student', [verifyToken], getStudents)
router.get('/api/student/:student_id', [verifyToken], getStudentsByParamId)
router.post('/api/student/id', [verifyToken], getStudentsById)
router.post('/api/student/dni', [verifyToken], getStudentsByDNI)
router.post('/api/student/modify', [verifyToken], modifyStudentData);
router.post('/api/student/image', [verifyToken], modifyStudentImage);

export default router;