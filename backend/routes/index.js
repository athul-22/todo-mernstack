import express from 'express'
import taskRoutes from './tasks.js'
import authRouter from './auth.js'
import usersRoute from './user.js'
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.use('/auth',authRouter);
router.use('/tasks',checkAuth,taskRoutes);
router.use('/users',checkAuth,usersRoute);


export default router;