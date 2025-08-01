import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import appRoutes from './routes/allRoutes';
import { notFound } from './routes/notFound';
import { errorHandler } from './Errors/globalErrorHandler';
import config from '../config/config';

const app: Application = express();
app.use(
  cors({
    origin: config.clientURL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', appRoutes);

// later
app.use(errorHandler);
app.use(notFound);
export default app;
