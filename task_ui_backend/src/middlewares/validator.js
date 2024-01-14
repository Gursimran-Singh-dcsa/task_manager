import { STATUS } from "../constants.js";
import HttpErrorService from "../services/HttpErrorService.js";

const validationMiddleWare = (expectedSchema) => (req, res, next) => {
  const { error } = expectedSchema.validate(req.body);
  if (error) {
    const HttpError = new HttpErrorService(STATUS.UNPROCESSABLE_ENTITY, error.details[0].message, [error.details[0].message]);
    return next(HttpError);
  } else {
    next();
  }
};
export default validationMiddleWare;
