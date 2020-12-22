import { UserInstance } from 'db/models/user';
import { VideoInstance } from 'db/models/video';

export interface UserDetails extends UserInstance {
  videos: VideoInstance[];
}
