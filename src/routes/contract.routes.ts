import { createContract } from './../controllers/contract.controller';
import { verifyToken } from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.post('/api/contract/signup', verifyToken, createContract)
export default router;
