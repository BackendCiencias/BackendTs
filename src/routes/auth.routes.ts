import { isSecretary, verifyToken } from '../middlewares/jwt.handle';
// import { checkJwt } from './../middlewares/session';
import { Router } from 'express';
const router: Router = Router();

import {signinSecretary, signupSecretary, profileSecretary} from '../controllers/auth.controller'
import { payPension } from '../controllers/pension.controller';

router.get('/', (req,res) => {
    res.send('Backend alive... at least for now')
})

router.post('/api/auth/secretary/signup', [verifyToken, isSecretary], signupSecretary);
router.post('/api/auth/secretary/signin', signinSecretary);
router.get('/api/auth/secretary/profile', [verifyToken, isSecretary], profileSecretary);
router.post('/api/secretary/pension',[verifyToken, isSecretary], payPension);

export default router;