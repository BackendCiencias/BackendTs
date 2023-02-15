import { getTutorsByDNI, createTutor, getTutors } from './../controllers/tutor.controller';
import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/tutor/create', verifyToken, createTutor)
router.post('/api/tutor/dni', verifyToken, getTutorsByDNI)
router.get('/api/tutor', verifyToken, getTutors)


export default router;
