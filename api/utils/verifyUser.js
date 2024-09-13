import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';

// -----middleware to verify user-----
export const verifyToken = (req, res, next) => {
  // get token from cookies
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, `UNAUTHORIZED`));

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // if token is valid, add user to request object
    if (err) return next(errorHandler(403, 'FORBIDDEN'));
    req.user = user;
    next();
  });
};
