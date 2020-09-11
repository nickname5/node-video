import { Sequelize } from "sequelize";
import UserModel from './models/user';
import VideoModel from './models/video';
import { dbConfig as config } from '../../config/';
// import { logger as log } from '../utils/logger';

// const logger = log(module);

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true,
    timezone: '+03:00'
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+03:00'
});

const User = UserModel(sequelize);
const Video = VideoModel(sequelize);

Video.belongsTo(User);
User.hasMany(Video, { onDelete: 'cascade' });

sequelize.sync(/* { force: true } */).then(() => {
  // logger.debug('sequelize synchronized successfully');
  console.log('sequelize synchronized successfully');
});

export { User, Video, sequelize };
