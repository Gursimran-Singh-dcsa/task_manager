import express from 'express';
import TaskRouter from './tasks.js';



const v1Router = express.Router();
v1Router.use('/task', TaskRouter);


export default v1Router;
