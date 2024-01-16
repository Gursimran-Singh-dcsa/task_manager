import { model } from "mongoose";
import { COLLECTION_NAMES } from "../constants.js";
import { UserSchema } from "../schema/users.js";
import paginate from 'mongoose-paginate-v2';

export const UserModel = new model(COLLECTION_NAMES.USERS_COLLECTION, UserSchema.plugin(paginate));

