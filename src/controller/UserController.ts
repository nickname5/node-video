import { UserService } from 'service/UserService';
import { Request, NextFunction, Response } from 'express';
import { VideoService } from 'service/VideoService';

// import config from 'config';

export class UserController {
  static async getFullUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const user = await UserService.getUser(id);
      const videos = await VideoService.getUserVideos(id);
      console.log('user videos', id, user, videos);

      res.send(user);
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
}
