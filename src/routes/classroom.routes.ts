import { verifyToken } from './../utils/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

import {getVacancies, generateAllVacancies, collegueVacancies} from '../controllers/classroom.controller'

router.get('/api/classroom/', verifyToken, getVacancies)
router.post('/api/classroom/vacancies', verifyToken, collegueVacancies)
router.post('/api/classroom/generate', verifyToken, generateAllVacancies)

export default router;
