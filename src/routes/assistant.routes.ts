import { getAssistants, createAssistant, getAssistantsById, getAssistantsByDNI, signinAssistant, createAttendance, studentAttendance} from '../controllers/assistant.controller';
import { verifyToken, isSecretary, isAssistant} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/assistant/signup', [verifyToken, isSecretary], createAssistant)
router.post('/api/assistant/signin', signinAssistant);
router.get('/api/assistant', [verifyToken, isSecretary], getAssistants)
router.get('/api/assistant/:assistant_id', [verifyToken, isSecretary], getAssistantsById)
router.post('/api/assistant/dni', [verifyToken, isSecretary], getAssistantsByDNI)
router.post('/api/assistant/createatt', [verifyToken, isAssistant], createAttendance)
router.post('/api/assistant/studentAtt', [verifyToken, isAssistant], studentAttendance)


export default router;
