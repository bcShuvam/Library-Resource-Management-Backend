import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllCatalog, createCatalog, updateCategory, updateQuantity, deleteCatalogById } from '../controllers/catalogController.js';

const router = express.Router();

// Setup Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads')); // use absolute path
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${unique}.${ext}`);
  },
});

const upload = multer({ storage });

router.get('/', getAllCatalog);
router.post('/', upload.single('image'), createCatalog);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCatalogById);
router.patch('/:id/quantity', updateQuantity);

export default router;