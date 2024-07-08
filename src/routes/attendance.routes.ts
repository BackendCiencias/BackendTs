import { studentAttendance, attendanceByGradeAndSection, attendanceByStudent } from './../controllers/attendance.controller';
import { verifyToken, isAssistant} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/attendance/studentAtt', [verifyToken, isAssistant], studentAttendance)
router.post('/api/attendance/classroom', [verifyToken], attendanceByGradeAndSection)
router.post('/api/attendance/student', [verifyToken], attendanceByStudent)

export default router;