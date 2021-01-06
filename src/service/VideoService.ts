import { Video } from 'db/';
import { VideoInstance } from 'db/models/video';

export class VideoService {
  static async getVideo(id: number): Promise<VideoInstance> {
    return await Video.findOne({ where: { id } });
  }

  static async getUserVideos(id: number): Promise<Array<VideoInstance>> {
    return await Video.findAll({ where: { userId: id } });
  }

  static async getVideoList(page: number, limit: number, order: string, direction: string): Promise<[VideoInstance[], number]> {
    // todo: handle private
    const count = await Video.count();

    const data = await Video.findAll({
      offset: page * limit,
      limit: limit,
      order: [[order, direction]],
    });

    return [data, count];
  }

  static async addVideo(userId: number, meta: Record<string, any>) {
    return await Video.create({
      originalName: meta.originalname,
      name: meta.filename,
      path: meta.path,
      private: false,
      userId,
    });
  }
}
