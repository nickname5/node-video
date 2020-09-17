import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import multer from 'multer';
// eslint-disable-next-line
const ejs = require("ejs").__express;

import indexRouter from './routes';
import usersRouter from './routes/users';

const app = express();
export const upload = multer({ dest: '../storage'});

/** todo list:
 *  1. replace morgan with something else
 *  2. controllers
 *  3. replace ejs with react?
 *  4. auth
 *  5. database migrations
 *  6. video storage
 * */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.ejs', ejs); // https://stackoverflow.com/questions/41707662/webpack-express-ejs-error-cannot-find-module

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
