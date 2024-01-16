import express from 'express';
import { STATUS } from '../../constants.js';
import { createTask, deleteTask, getPendingTaskByPriority, getTask, updateTask } from '../../controllers/taskController.js';
import { validateToken } from '../../middlewares/auth.js';
import validationMiddleWare from '../../middlewares/validator.js';
import HttpErrorService from '../../services/HttpErrorService.js';
import { createTaskValidation, deleteTaskValidation } from '../../validations/taskRouteValidations.js';

const TaskRouter = express.Router();

TaskRouter.use(async (req, res, next) => {
  const resp = await validateToken(req);
  if (resp?.inValid || resp?.error) {
    const HttpError = new HttpErrorService(STATUS.UNAUTHORIZED, `token invalid or expired plese relogin`);
    return next(HttpError);
  }

  req.user_data = resp?.data;
  next();
});
TaskRouter.post('/create', validationMiddleWare(createTaskValidation), createTask);
TaskRouter.get('/getTask', getTask);
TaskRouter.delete('/deleteTasks', validationMiddleWare(deleteTaskValidation), deleteTask);
TaskRouter.put('/updateTask/:id', validationMiddleWare(createTaskValidation), updateTask);
TaskRouter.get('/getPendingTaskByPriority', getPendingTaskByPriority);
export default TaskRouter;
