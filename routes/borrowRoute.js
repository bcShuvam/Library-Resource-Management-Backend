import express from 'express';
import {getAllBorrowReq, newBorrowReq} from '../controllers/borrowController.js';
const router = express.Router();

router.get('/', getAllBorrowReq);
router.post('/', newBorrowReq);

export default router;