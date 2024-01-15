import express from 'express';
import TaskRouter from './tasks.js';
import UserRouter from './users.js';



const v1Router = express.Router();
v1Router.use('/task', TaskRouter);
v1Router.use('/user', UserRouter);


export default v1Router;
