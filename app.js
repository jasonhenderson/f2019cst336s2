var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// Setup sessions
app.use(session({
  'secret': 'Kfv34cz2WC'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   req.happyMessage = "happy!";
//   next();
// })

// ROUTING
var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var usersRouter = require('./routes/users');
var lookupRouter = require('./routes/lookup');
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/lookup', lookupRouter);

// For exercises
var routingExerciseRouter = require('./routes/exercises/routing');
var exerciseRouter = require('./routes/exercises/index');
app.use('/exercises/routing', routingExerciseRouter);
app.use('/exercises', exerciseRouter);

// For examples
var mysqlExampleRouter = require('./public/examples/mysql/router');
var authExampleRouter = require('./public/examples/auth/router');
var uploadExampleRouter = require('./public/examples/file-upload/router');
app.use('/mysql', mysqlExampleRouter);
app.use('/auth', authExampleRouter);
app.use('/upload', uploadExampleRouter);

// For labs
var lab9Router = require('./public/labs/9/router');
var lab10Router = require('./public/labs/10/router');
var lab10jsonRouter = require('./public/labs/10json/router');
app.use('/lab/9', lab9Router);
app.use('/lab/10', lab10Router);
app.use('/lab/10/json', lab10jsonRouter);

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

module.exports = app;
