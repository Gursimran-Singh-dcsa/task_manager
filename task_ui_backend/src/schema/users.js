import mongoose, { Schema } from "mongoose";
import { COLLECTION_NAMES } from "../constants.js";

export const UserSchema = new Schema({
  userName: { type: String, unique: true },
  password: { type: String, select: false },
  email: { type: String, unique: true },
  tasks: [{
    type: mongoose.Types.ObjectId,
    ref: COLLECTION_NAMES.TASKS_COLLECTION
  }]
}, { timestamps: true });
