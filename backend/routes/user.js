import express from 'express';
import { getUserInfo,updateUserInfo } from '../controllers/user.js';

const router = express.Router();

router.get('/profile',getUserInfo)
router.put('/profile',updateUserInfo)

export default router;