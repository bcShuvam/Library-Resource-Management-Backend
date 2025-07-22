import express from 'express';
import { getAllCategory, createCategory, updateCategory, deleteCategory} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;