import mongoose from "mongoose";
import { STATUS } from "../constants.js";
import TaskModel from "../modals/task.js";
import { UserModel } from "../modals/user.js";
import HttpErrorService from "../services/HttpErrorService.js";
import ResponseService from "../services/ResponseService.js";

export const createTask = async (req, res, next) => {
  try {
    const task = new TaskModel({ ...req.body, dueDate: new Date(req.body.dueDate), user: req.user_data.id });
    const data = await task.save();
    const user = await UserModel.findOne({ email: req.user_data.email });
    user.tasks.push(task);
    const userData = await user.save();
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully created new Task');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Creating New Task', err);
    return next(HttpError);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const userData = req.user_data;
    let { pageNumber = 1, pageSize = 10, keyword = '', dueDate = '', priority = '' } = req.query;
    const options = {};
    if (keyword) options.name = { $regex: '.*' + keyword + '.*' };
    if (dueDate) options.dueDate = dueDate;
    if (priority) options.priority = priority;
    const data = await TaskModel.paginate({
      ...options,
      user: new mongoose.Types.ObjectId(userData.id)
    }, {
      page: pageNumber,
      limit: pageSize,
      customLabels: { docs: 'taskList' },
      sort: { dueDate: 1 },

    });
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully fetched tasks');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed getting Tasks', { err });
    return next(HttpError);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const data = await TaskModel.deleteMany({
      _id: req.body.ids
    });
    const httpResponse = new ResponseService(STATUS.DELETED, {}, 'SuccessFully Deleted Tasks');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Deleting Tasks', err);
    return next(HttpError);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await TaskModel.findOneAndUpdate({ _id: id }, {
      isComplete: req.body.isComplete,
      dueDate: req.body.dueDate,
      name: req.body.name,
      description: req.body.description,
      priority: req.body.priority
    });
    const httpResponse = new ResponseService(STATUS.HTTP_OK, { data }, 'SuccessFully Updated Task');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Updating Task', err);
    return next(HttpError);
  }
};

export const getPendingTaskByPriority = async (req, res, next) => {
  try {
    const userData = req.user_data;
    const data = await TaskModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userData.id), isComplete: false } }
      , {
        $group: {
          // _id: { priority: '$priority' },
          _id: '$priority',
          count: { $sum: 1 }
        }
      }]);
    const httpResponse = new ResponseService(STATUS.HTTP_OK, { data }, 'SuccessFully fetched Pending tasks by priority');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed getting Pending tasks by priority', err);
    return next(HttpError);
  }
};

export const getTotalAndPendingTasks = async (req, res, next) => {
  try {
    const userData = req.user_data;
    const pendingTasks = await  TaskModel.countDocuments({ user: userData.id, isComplete: false });
    const totalTasks = await TaskModel.countDocuments({ user: userData.id });
    const httpResponse = new ResponseService(STATUS.HTTP_OK, { data: {totalTasks, pendingTasks} }, 'SuccessFully fetched Pending tasks by priority');
    return res.json(httpResponse);
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed getting Pending and Total Tasks', err);
    return next(HttpError);
  }
};
