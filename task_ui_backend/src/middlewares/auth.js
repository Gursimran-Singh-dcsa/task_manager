import jwt from "jsonwebtoken";
import { STATUS } from "../constants.js";
import dotenv from 'dotenv';

export const generateToken = async (userDetails) => {
  try {
    dotenv.config();
    const { userName, email, _id } = userDetails;
    const accessToken = jwt.sign(
      { userName, email, id: _id },
      process.env.SECRET_KEY,
      { expiresIn: "300000" }
    );
    return Promise.resolve({ accessToken });
  } catch (err) {
    return Promise.reject({ data: "failed", accessToken: null, reason: err });
  }
};

export const validateToken = async (req) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      return Promise.resolve({ data, error: false, inValid: false });
    } catch (err) {
      return Promise.resolve({ error: true, inValid: false });
    }
  } else {
    return Promise.resolve({ inValid: true, error: false });
  }
};
