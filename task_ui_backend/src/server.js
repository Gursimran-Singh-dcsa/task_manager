import express from 'express';
import { connectMongo } from '../connection.js';
import { PORT } from './constants.js';
import v1Router from './routes/v1/index.js';
import HttpErrorService from './services/HttpErrorService.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(express.json());
console.log('process.env.ALLOWED_HOSTS.split(",")', process.env.ALLOWED_HOSTS.split(","));
app.use(
  cors({
    origin: process.env.ALLOWED_HOSTS.split(",").map((host) => host.trim()),
    credentials: true,
  })
);

app.use('/api/v1', v1Router);
app.use(() => {
  throw new HttpErrorService(404, "Something went wrong");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ ...error, message: error.message || "Something went wrong" });
});

try {
  await connectMongo();
  app.listen(PORT, () => {
    console.log("app started on ", PORT);
  });
} catch (err) {
  console.log("failed to start the applcation due to", err);
  process.exit(1);
}

