import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();
import { getTutorsByDNI, createTutor} from '../controllers/tutor.controller'

router.post('/api/tutor/create', verifyToken, createTutor)
router.post('/api/tutor/dni', verifyToken, getTutorsByDNI)

export default router;
