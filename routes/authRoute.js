import express from 'express';
import {continueWithGoogle, registerFbToken} from '../controllers/authController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/google', continueWithGoogle);
router.patch('/fbToken', verifyJWT, registerFbToken);

export default router;