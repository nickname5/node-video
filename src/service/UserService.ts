import { User } from '../db/';
import { UserInstance } from '../db/models/user';

export class UserService {
  static async getUser(id: number): Promise<UserInstance> {
    return await User.findOne({ where: { id } });
  }
}
