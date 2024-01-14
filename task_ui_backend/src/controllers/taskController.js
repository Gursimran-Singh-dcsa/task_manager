import { STATUS } from "../constants.js";
import TaskModel from "../modals/task.js";
import HttpErrorService from "../services/HttpErrorService.js";
import ResponseService from "../services/ResponseService.js";
import mongoosePaginate from 'mongoose-paginate-v2'

export const createTask = async (req, res, next) => {
  try {
    const task = new TaskModel({ ...req.body, dueDate: new Date(req.body.dueDate) });
    const data = await task.save(req.body);
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully created new Task');
    return res.json(httpResponse);
  } catch (err) {
    console.log(err)
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Creating New Task', err);
    return next(HttpError);
  }
};

export const getTask = async (req, res, next) => {
  try {
    let {pageNumber= 1, pageSize=10} = req.query
    const data = await TaskModel.paginate({}, {
      page: pageNumber,
      limit: pageSize,
      customLabels: {docs: 'taskList'}
    });
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully fetched tasks');
    return res.json(httpResponse);
  } catch (err) {
    console.log('err', err);
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed getting Tasks', { err });
    return next(HttpError);
  }
};
