import express from 'express';
import { createUser, loginUser } from '../../controllers/userController.js';
import validationMiddleWare from '../../middlewares/validator.js';
import { createUserValidation, loginUserValidation } from '../../validations/userRouteValidations.js';

const UserRouter = express.Router();

UserRouter.post('/create', validationMiddleWare(createUserValidation), createUser)
UserRouter.post('/login', validationMiddleWare(loginUserValidation), loginUser)
export default UserRouter;
