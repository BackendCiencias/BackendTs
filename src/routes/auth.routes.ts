import { verifyToken } from './../utils/jwt.handle';
// import { checkJwt } from './../middlewares/session';
import { Router } from 'express';
const router: Router = Router();

import {signinSecretary, signupSecretary, profileSecretary} from '../controllers/auth.controller'

router.get('/', (req,res) => {
    res.send('Backend alive... at least for now')
})

router.post('/api/auth/secretary/signup', signupSecretary);
router.post('/api/auth/secretary/signin', signinSecretary);

router.get('/api/auth/secretary/profile', verifyToken, profileSecretary);

export default router;