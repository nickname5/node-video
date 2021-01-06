import { UserService } from 'service/UserService';
import { Request, NextFunction, Response } from 'express';
import { VideoService } from 'service/VideoService';

import config from 'config';
import { generateToken } from 'middleware/authenticate';

export class UserController {
  static async getFullUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const user = await UserService.getUser(id);
      const videos = await VideoService.getUserVideos(id);

      res.send({ user, videos });
    } catch (e) {
      next(e);
    }
  }

  static async getUserList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { page = 0, limit = 10, order = 'id', direction = 'ASC' } = req.params;

    try {
      const [users, count] = await UserService.getUsers(+page, +limit, order, direction);

      res.send(users);
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, password } = req.body; // todo: form data

    try {
      let result = null;

      if (name && password) {
        const user = await UserService.getUserByName(name);
        if (!user) {
          return next(new Error('Incorrect username'));
        }
        const passwordIsValid = await user.validPassword(password);
        console.log('bcrypt says: valid = ', passwordIsValid);
        if (passwordIsValid) {
          const token = generateToken(user.name, user.id);
          res.cookie(config.authCookieName, token, { maxAge: 60 * 60 * 1000, secure: true  /* , httpOnly: true */  });
          result = { name, token, id: user.id };
          res.send(result);
        } else {
          console.log('Unautorized!');
          return next(new Error('Incorrect password'));
        }
      }
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('server logout');
    res.clearCookie(config.authCookieName);
    res.send();
  }
}
