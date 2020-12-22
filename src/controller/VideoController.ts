import { VideoService } from 'service/VideoService';
// import { upload } from 'middleware/multer';

export class VideoController {
  static async getVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const video = await VideoService.getVideo(id);

      // res.render('video', {
      //   video
      // });
    } catch (e) {
      next(e);
    }
  }

  static async uploadVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      await VideoService.addVideo(id, (req as any).file);
      res.end("File is uploaded"); // fixme?
    } catch (e) {
      throw Error(e);
    }
  }
}

import { Request, NextFunction, Response } from 'express';
