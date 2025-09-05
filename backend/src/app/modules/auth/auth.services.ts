import httpStatus from 'http-status';
import { Request, Response } from 'express';
import logger from '../../../logs/logger';
import Users from '../user/user.model';
import AppError from '../../Errors/AppError';
import SendResponse from '../../../utils/SendResponse';
import mongoose, { ObjectId } from 'mongoose';
import sendEmail from '../../../utils/sendEmail';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../../../config/config';

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const emailToken = jwt.sign({ userId: user._id }, config.jwtEmailVerification!, {
      expiresIn: '1h',
    });
    console.log('Email Token:', emailToken);

    const mailDetails = {
      to: user.email,
      subject: 'Please Verify Your Email Address',
      header: 'Verify Your Email',
      heading: 'Verify Your Email', // Added missing property
      message: 'Please click the link below to verify your email address.', // Added missing property
      link: `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`,
    };

    const mailResponse = await sendEmail(mailDetails);
    await session.commitTransaction();
    session.endSession();
    const { name, email, _id } = user;
    return { name, email, _id };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error instanceof Error ? error.message : 'Transaction failed');
  }
};

const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtEmailVerification!) as JwtPayload;

    console.log(decoded);

    if (!decoded || !decoded.exp || !decoded.userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const user = await Users.findById(decoded.userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.isVerified) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Bad Request');
    }

    user.isVerified = true;
    await user.save();

    logger.info('Email verified successfully for user:', user.email);
    return { expired: false, user };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const decoded = jwt.decode(token) as JwtPayload;
      return { expired: true, user: decoded.user };
    }

    throw new AppError(
      httpStatus.UNAUTHORIZED,
      (error as Error).message || 'Failed to verify Email',
    );
  }
};

// reverify
const reVerifyEmail = async (id: ObjectId) => {
  const user = await Users.findById(id);

  if (!user || user.isVerified) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found or already verified');
  }

  try {
    const emailToken = jwt.sign({ userId: user._id }, config.jwtEmailVerification!, {
      expiresIn: '1h',
    });

    const mailDetails = {
      to: user.email,
      subject: 'Please Verify Your Email Address',
      header: 'Verify Your Email',
      heading: 'Verify Your Email',
      message: 'Please click the link below to verify your email address.',
      link: `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`,
    };

    await sendEmail(mailDetails);

    const { name, email, _id } = user;
    return { name, email, _id };
  } catch (error) {
    throw new AppError(500, error instanceof Error ? error.message : 'Failed to send Email');
  }
};

export default {
  RegisterUser,
  verifyEmail,
  reVerifyEmail,
};
