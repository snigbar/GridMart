import httpStatus from 'http-status';
import { Request, Response } from 'express';
import logger from '../../../logs/logger';
import Users from '../user/user.model';
import AppError from '../../Errors/AppError';
import SendResponse from '../../../utils/SendResponse';

const RegisterUser = async (req: Request, res: Response) => {
  logger.info('Loggin Data.... ', req.body);

  const body = req.body;

  const isUserExists = await Users.isUserExistsByEmail(body?.email);

  if (isUserExists) {
    SendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'User Already Exists, Sign In',
      data: null,
    });

    return;
  }

  const user = await Users.create(body);

  if (!user) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create user');
  }

  return user;
};

export default {
  RegisterUser,
};
