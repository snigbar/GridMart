import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/api/v1', async (req: Request, res: Response) => {
  res.json({ message: 'Server is running.......... ' });
});

// later
// app.use(golobalErrorHandler)
// app.use(notfound)
export default app;
