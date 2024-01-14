import { Model } from "mongoose";
import { COLLECTION_NAMES } from "../constants";
import { UserSchema } from "../schema/users";

const UsersModel = new Model(COLLECTION_NAMES.USERS_COLLECTION, UserSchema);

export default UserSchema
