import express from 'express'
const router = express.Router();
import { createTask, getAllTask,currentUserTasks ,updateTask,deleteTask} from '../controllers/task.js'

router.post('/',createTask);
router.get('/all',getAllTask);
router.get('/mytasks',currentUserTasks);
router.put('/:taskId',updateTask);
router.delete('/:taskId',deleteTask)


export default router;