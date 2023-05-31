import {signupDirector, signinDirector, advanceSalary} from './../controllers/director.controller';
import { verifyToken, isDirector} from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/director/signup', [verifyToken, isDirector], signupDirector)
router.post('/api/director/signin', signinDirector)
router.post('/api/director/pay', [verifyToken, isDirector], advanceSalary)

export default router;
