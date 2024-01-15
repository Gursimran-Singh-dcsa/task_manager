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
      sort: { createdAt: -1 }
    });
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully fetched tasks');
    return res.json(httpResponse);
  } catch (err) {
    console.log('err', err);
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed getting Tasks', { err });
    return next(HttpError);
  }
};
