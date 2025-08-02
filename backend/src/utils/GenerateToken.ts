import jwt from 'jsonwebtoken';
import config from '../config/config';

const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ id: userId, role }, config.jwtRefreshToken!, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: userId }, config.jwtRefreshToken!, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
