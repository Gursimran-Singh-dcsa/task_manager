import mongoose, { Schema } from "mongoose";
import { COLLECTION_NAMES } from "../constants.js";

export const TaskSchema = new Schema({
  name: { type: String },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  dueDate: { type: Date },
  user: { type: mongoose.Types.ObjectId, ref: COLLECTION_NAMES.TASKS_COLLECTION },
  isComplete: { type: Boolean, default: false }
}, { timestamps: true });
