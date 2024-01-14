import { DB_NAME } from './src/constants.js';
import { connect } from 'mongoose';
import dotenv from 'dotenv'
export async function connectMongo() {
  dotenv.config()
  return await connect(`${process.env.DB_URL}/${DB_NAME}`);
}
