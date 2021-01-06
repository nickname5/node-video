import * as jwt from 'jsonwebtoken';
import config from 'config';
import { Request, NextFunction, Response } from 'express';
import { ErrorResponse } from 'models/ErrorResponse';

export const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  // const token = req.headers.authorization;

  console.log('Cookies: ', req.cookies);

  const token = req.cookies[config.authCookieName];

  function clearTokenAndNext() { // todo: rename
    res.clearCookie(config.authCookieName); // .redirect('/'); // todo: check me?
    console.log('bad token');
    const err = new ErrorResponse('Unauthorized');
    err.status = 401;
    throw err;
  }

  if (!token) {
    return clearTokenAndNext();
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    console.log('try jwt verify', token, config.jwtSecret);
    if (err) {
      return clearTokenAndNext();
    }
    console.log('jwt verified', decoded);
    // req.user = {
    //   name: decoded.name,
    //   id: decoded.id
    // };
    next();
  });
};

// todo: move somewhere else?
export const generateToken = (name: string, id: number): string => {
  const payload = {
    login: name,
    id: id,
    time: new Date(),
    exp: +new Date + config.tokenExpireTime,
  };
  return jwt.sign(payload, config.jwtSecret); // token
};
