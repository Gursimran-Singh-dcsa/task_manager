import express from 'express';
import { connectMongo } from '../connection.js';
import { PORT } from './constants.js';
import TaskRouter from './routes/tasks.js';
import HttpErrorService from './services/HttpErrorService.js';

const app = express();


app.use(express.json());
app.use('/task', TaskRouter);
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

