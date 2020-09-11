import bcrypt from 'bcrypt';
import { Model, DataTypes, Sequelize, ModelCtor } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  mail: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// We need to declare an interface for our model that is basically what our class would be
export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

// export interface UserModel extends Model<UserAttributes>, UserAttributes {}
// export class User extends Model<UserModel, UserAttributes> {}
//
// type UserStatic = typeof Model & {
//   new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
// };

export default (sequelize: Sequelize): ModelCtor<UserInstance> => {
  const User = sequelize.define<UserInstance>('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    hooks: {
      beforeCreate: (user: UserInstance) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
