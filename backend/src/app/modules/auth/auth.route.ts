import { Router } from 'express';
import authController from './auth.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import authValidation from './auth.validation';

const authRouter = Router();

// login
authRouter.post('/login', authController.login);

// register
authRouter.post(
  '/register',
  validateRequest(authValidation.registerValidationSchema),
  authController.register,
);

// verify email
authRouter.post(
  '/verify-email',
  validateRequest(authValidation.verifyEmailValidationSchema),
  authController.verifyEmail,
);

// reverify email
authRouter.post(
  '/reVerify-email',
  validateRequest(authValidation.reVerificationSchema),
  authController.reVerification,
);

export default authRouter;
