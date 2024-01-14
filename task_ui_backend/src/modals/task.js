import { model } from "mongoose";
import { COLLECTION_NAMES } from "../constants.js";
import { TaskSchema } from "../schema/tasks.js";
import paginate from 'mongoose-paginate-v2';

const TaskModel =  model(COLLECTION_NAMES.TASKS_COLLECTION, TaskSchema.plugin(paginate));

export default TaskModel;
