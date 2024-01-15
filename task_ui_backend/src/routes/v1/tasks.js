import express from 'express';
import { createTask, deleteTask, getTask, updateTask } from '../../controllers/taskController.js';
import validationMiddleWare from '../../middlewares/validator.js';
import { createTaskValidation, deleteTaskValidation } from '../../validations/taskRouteValidations.js';

const TaskRouter = express.Router();

TaskRouter.post('/create', validationMiddleWare(createTaskValidation), createTask);
TaskRouter.get('/getTask', getTask);
TaskRouter.delete('/deleteTasks', validationMiddleWare(deleteTaskValidation), deleteTask);
TaskRouter.put('/updateTask/:id', validationMiddleWare(createTaskValidation), updateTask)
export default TaskRouter;
