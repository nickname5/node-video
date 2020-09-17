import { Request, NextFunction, Response } from 'express';
import { VideoService } from 'service/VideoService';
import { upload } from 'app';

export class VideoController {
  static async getVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const video = await VideoService.getVideo(id);

      res.render('video', {
        video
      });
    } catch (e) {
      next(e);
    }
  }

  static async uploadVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    upload.single('file')(req,res,function(err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
    });
    // console.log(req.params);
    // res.writeHead(200);
    // res.write('hmmmmmm');
    // res.end();
    // const id = +req.params.id;
  }
}
