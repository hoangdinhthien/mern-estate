import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  //
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, `UNAUTHORIZED`));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'FORBIDDEN'));

    req.user = user;
    next();
  });
};
