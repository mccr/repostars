require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);
const passport       = require("passport");

const index = require('./routes/index');
const auth = require('./routes/auth');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL).then( () => debug('connected to DB'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);
app.set('layout', 'layout/main');

// default value for title local
app.locals.title = 'Repostars';

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./passport/config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
