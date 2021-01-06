import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from 'routes';
import usersRouter from 'routes/users';
import videoRouter from 'routes/video';

import config from 'config';

const app = express();

/** todo list:
 *  1. replace morgan with something else
 *  2. ACL
 *  4. auth
 *  5. database migrations
 * */

app.use(logger('dev')); // todo

app.use(cors({
  origin: config.frontEndUrl,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/video', videoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);

  // render the error page
  res.status(err.status || 500).send({ message: err.message || 'server error' });
  next();
});

export default app;
