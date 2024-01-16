import { STATUS } from "../constants.js";
import { UserModel } from "../modals/user.js";
import HttpErrorService from "../services/HttpErrorService.js";
import ResponseService from "../services/ResponseService.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generateToken } from "../middlewares/auth.js";

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    dotenv.config();
    const salt = await bcrypt.genSalt(Number(process.env.salt));
    const hashpassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashpassword;
    const user = new UserModel({ ...req.body });
    const data = await user.save();
    delete data.password;
    const httpResponse = new ResponseService(STATUS.CREATED, { data }, 'SuccessFully Created User');
    return res.json(httpResponse);
  } catch (err) {
    let HttpError = null;

    if (err.code === 11000) {
      HttpError = new HttpErrorService(STATUS.FORBIDDEN, `(${Object.keys(err.keyValue).join(',')}) already exits as (${Object.values(err.keyValue).join(',')})`, err);
    } else {
      HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'failed Creating User', err);
    }
    return next(HttpError);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await UserModel.findOne({ email: req.body.email }).select("+password");
    if (!data) {
      {
        const HttpError = new HttpErrorService(STATUS.UNAUTHORIZED, 'Incorrect Email or password');
        return next(HttpError);
      }
    }
    const verifiedpass = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (verifiedpass) {
      const token = await generateToken(data);
      const httpResponse = new ResponseService(STATUS.HTTP_OK, { data: { userName: data.userName, email: data.email, token: token.accessToken } }, 'Logged in successfully');
      return res.json(httpResponse);
    } else {
      const HttpError = new HttpErrorService(STATUS.UNAUTHORIZED, 'Incorrect Email or password');
      return next(HttpError);
    }
  } catch (err) {
    const HttpError = new HttpErrorService(STATUS.INTERNAL_SERVER_ERROR, 'Internal server error', err);
    return next(HttpError);
  }
};
