import { Request, NextFunction, Response } from 'express';
import { VideoService } from 'service/VideoService';
import * as pathUtil from "path";
import * as fs from "fs";

export class VideoController {
  static async getVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const name = req.params.name;

    try {
      // const video = await VideoService.getVideo(id);
      const path = pathUtil.join(__dirname, `../storage/${name}`);
      console.log(path);
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    } catch (e) {
      next(e);
    }
  }

  static async uploadVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = +req.params.id;

    try {
      const video = await VideoService.addVideo(id, (req as any).file);
      res.send(video);
    } catch (e) {
      throw Error(e);
    }
  }
}

