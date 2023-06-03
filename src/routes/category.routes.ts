import { createCategory, getCategories } from '../controllers/category.controller';
import { verifyToken } from '../middlewares/jwt.handle';
import { Router } from 'express';
const router: Router = Router();

router.get('/api/category/', verifyToken, getCategories)
router.post('/api/category/create', verifyToken, createCategory)

export default router;
