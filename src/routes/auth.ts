import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
const router: Router = Router();

import {signin, signup, profile} from '../controllers/auth.controller'

router.post('/api/auth/secretary/signup', signup);
router.post('/api/auth/secretary/signin', signin);

router.get('/api/auth/secretary/profile', TokenValidation, profile);

export default router;