import { ZodObject } from 'zod';
import catchAsync from '../utils/CatchAsync';
import { NextFunction, Request } from 'express';

export const validateRequest = (validationSchema: ZodObject) => {
  return catchAsync(async (req: Request, _, next: NextFunction) => {
    await validationSchema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};
