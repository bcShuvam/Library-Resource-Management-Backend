import express from 'express';
import { getAllCategory, createCategory, updateCategory, deleteCategory} from '../controllers/categoryController.js';
import { verifyRole } from '../middleware/verifyRoles.js';
const router = express.Router();

router.get('/', getAllCategory);
router.post('/', verifyRole('Admin'), createCategory);
router.put('/:id', verifyRole('Admin'), updateCategory);
router.delete('/:id', verifyRole('Admin'), deleteCategory);

export default router;