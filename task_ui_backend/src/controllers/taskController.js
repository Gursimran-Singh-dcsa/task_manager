import { STATUS } from "../constants.js";
import TaskModel from "../modals/task.js";
import HttpErrorService from "../services/HttpErrorService.js";
import ResponseService from "../services/ResponseService.js";

export const createTask = async (req, res, next) => {
  try {
    const task = new TaskModel({ ...req.body, dueDate: new Date(req.body.dueDate) });
    const data = await task.save(req.body);
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully created new Task');
    return res.json(httpResponse);
  } catch (err) {
    console.log(err);
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Creating New Task', err);
    return next(HttpError);
  }
};

export const getTask = async (req, res, next) => {
  try {
    let { pageNumber = 1, pageSize = 10, keyword = '', dueDate = '', priority = '' } = req.query;
    const options = {};
    if (keyword) options.name = { $regex: '.*' + keyword + '.*' };
    if (dueDate) options.dueDate = dueDate;
    if (priority) options.priority = priority;
    const data = await TaskModel.paginate({
      ...options
    }, {
      page: pageNumber,
      limit: pageSize,
      customLabels: { docs: 'taskList' },
      sort: { dueDate: 1 }
    });
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully fetched tasks');
    return res.json(httpResponse);
  } catch (err) {
    console.log('err', err);
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
    console.log(err);
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
    console.log(err);
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Updating Task', err);
    return next(HttpError);
  }
};
