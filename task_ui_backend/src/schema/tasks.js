import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  name: { type: String },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  dueDate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  isComplete: { type: Boolean, default: false }
}, { timestamps: true });
