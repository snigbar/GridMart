// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../../logs/logger';
import config from '../../config/config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('🔥 Global Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.enviroment === 'development' ? err.stack : undefined,
  });
};
