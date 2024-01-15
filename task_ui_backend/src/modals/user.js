import { model } from "mongoose";
import { COLLECTION_NAMES } from "../constants.js";
import { UserSchema } from "../schema/users.js";

export const UserModel = new model(COLLECTION_NAMES.USERS_COLLECTION, UserSchema);

export default UserSchema
