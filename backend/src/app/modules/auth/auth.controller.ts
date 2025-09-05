import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import catchAsync from '../../../utils/CatchAsync';
import sendResponse from '../../../utils/SendResponse';

import authServices from './auth.services';
import AppError from '../../Errors/AppError';
import config from '../../../config/config';

class AuthController {
  login: RequestHandler = catchAsync(async (req, res, next) => {
    // TODO: implement login
  });

  register: RequestHandler = catchAsync(async (req, res) => {
    const user = await authServices.RegisterUser(req, res);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Please Verify Your Email Address',
      data: user,
    });
  });

  // verify email
  verifyEmail: RequestHandler = catchAsync(async (req, res) => {
    const { token } = req.body;
    if (!token) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Token is required');
    }
    const updatedUser = await authServices.verifyEmail(token);

    if (updatedUser.expired) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.OK,
        message: 'Token Expired, Get another one',
        data: updatedUser,
      });

      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Email verified successfully',
      data: updatedUser,
    });
  });

  // re verify email
  reVerification: RequestHandler = catchAsync(async (req, res) => {
    const { user } = req.body;
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Not user found');
    }
    const updatedUser = await authServices.reVerifyEmail(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Verification Link has been sent to your email',
      data: updatedUser,
    });
  });
}

export default new AuthController();
