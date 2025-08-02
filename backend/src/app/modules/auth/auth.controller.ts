import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/CatchAsync';
import sendResponse from '../../../utils/SendResponse';

import authServices from './auth.services';

class AuthController {
  login: RequestHandler = catchAsync(async (req, res, next) => {
    // TODO: implement login
  });

  register: RequestHandler = catchAsync(async (req, res, next) => {
    const user = await authServices.RegisterUser(req, res);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Please Verify Your Email Address',
      data: user,
    });
  });
}

export default new AuthController();
