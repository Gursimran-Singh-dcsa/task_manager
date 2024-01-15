import express from 'express';
import { createTask, getTask } from '../../controllers/taskController.js';
import validationMiddleWare from '../../middlewares/validator.js';
import { createTagValidation } from '../../validations/taskRouteValidations.js';

const TaskRouter = express.Router();

TaskRouter.post('/create', validationMiddleWare(createTagValidation), createTask);
TaskRouter.get('/getTask', getTask)
export default TaskRouter;
