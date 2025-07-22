import express from 'express';
import multer from 'multer';
import path from 'path';
import { createCatalog } from '../controllers/catalogController.js';

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

router.post('/', upload.single('image'), createCatalog);

export default router;