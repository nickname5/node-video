import { UserService } from 'service/UserService';
import { Request, NextFunction, Response } from 'express';
import { VideoService } from 'service/VideoService';
import config from 'config';

export class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const user = await UserService.getUser(id);
      const videos = await VideoService.getUserVideo(id);
      console.log('user videos', id, videos);

      res.render('user', {
        user,
        apiUrl: config.hostname,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUserList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { page = 0, limit = 10, order = 'id', direction = 'ASC' } = req.params;

    try {
      const [users, count] = await UserService.getUsers(+page, +limit, order, direction);

      res.render('users', {
        title: 'User list',
        users
      });
    } catch (e) {
      next(e);
    }
  }
}
