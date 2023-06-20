import { createAttendance, getTodayAttendance, studentAttendance } from './../controllers/attendance.controller';
import { verifyToken, isAssistant} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/attendance/createatt', [verifyToken, isAssistant], createAttendance)
router.post('/api/attendance/studentAtt', [verifyToken, isAssistant], studentAttendance)
router.get('/api/attendance/today', [verifyToken, isAssistant], getTodayAttendance)

export default router;
