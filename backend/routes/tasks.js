import express from 'express';
const router = express.Router();
import { createTask, getAllTask, currentUserTasks, updateTask, moveToCompletedTasks } from '../controllers/task.js';

router.post('/', createTask);
router.get('/all', getAllTask);
router.get('/mytasks', currentUserTasks);
router.put('/:taskId', updateTask);
router.patch('/:taskId/completed', moveToCompletedTasks); // Use PATCH for moving to completed tasks
router.delete('/move-to-completed/:taskId', moveToCompletedTasks);

export default router;
