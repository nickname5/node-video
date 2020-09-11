import { generate } from 'shortid';
import { Model, DataTypes, Sequelize, ModelCtor } from "sequelize";

interface VideoAttributes {
  id: number;
  name: string;
  originalName: string;
  path: string;
  private: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VideoInstance extends Model<VideoAttributes>, VideoAttributes {}

export default (sequelize: Sequelize): ModelCtor<VideoInstance> => {
  return sequelize.define<VideoInstance>('video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: (video: VideoInstance) => {
        video.name = generate();
      }
    },
  });
};
