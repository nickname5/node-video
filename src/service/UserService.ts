import { User } from 'db/';
import { UserInstance } from 'db/models/user';

export class UserService {
  static async getUser(id: number): Promise<UserInstance> {
    return await User.findOne({ where: { id } });
  }

  static async getUsers(page: number, limit: number, order: string, direction: string): Promise<[UserInstance[], number]> {
    const count = await User.count();

    const data = await User.findAll({
      offset: page * limit,
      limit: limit,
      order: [[order, direction]],
    });

    return [data, count];
  }
}
