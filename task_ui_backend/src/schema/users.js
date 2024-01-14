import { Schema } from "mongoose";

export const UserSchema = new Schema({
  userName: { type: String, unique: true },
  password: { type: String, select: false },
  email: { type: String, unique: true },
}, { timestamps: true });
