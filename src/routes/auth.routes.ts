import { Router } from 'express';
import { verifyToken } from '../utils/jwt.handle';
const router: Router = Router();

import {signin, signup, profile} from '../controllers/auth.controller'

router.get('/', (req,res) => {
    res.send('Backend alive... at least for now')
})

router.post('/api/auth/secretary/signup', signup);
router.post('/api/auth/secretary/signin', signin);

router.get('/api/auth/secretary/profile', verifyToken, profile);

export default router;