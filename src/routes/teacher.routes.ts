import { getTeachers, createTeacher, getTeachersById, getTeachersByDNI } from './../controllers/teacher.controller';
import { verifyToken, isSecretary} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/teacher/signup', [verifyToken, isSecretary], createTeacher)
router.get('/api/teacher', [verifyToken, isSecretary], getTeachers)
router.get('/api/teacher/:teacher_id', [verifyToken, isSecretary], getTeachersById)
router.post('/api/teacher/dni', [verifyToken, isSecretary], getTeachersByDNI)

export default router;
