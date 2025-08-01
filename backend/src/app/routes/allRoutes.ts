import express from 'express';
import authRouter from '../modules/auth/auth.route';

const appRoutes = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

allRoutes.forEach((val) => appRoutes.use(val.path, val.route));

export default appRoutes;
