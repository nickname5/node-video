export default {
  hostname: 'http://localhost:3002', // '127.0.0.1',
  port: 3002,
  jwtSecret: 'qwerty', // bad place
  tokenExpireTime: 86400,// '6h',
  authCookieName: 'AuthToken',
  frontEndUrl: 'http://localhost:4200',
};

export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database : 'video_db'
};
