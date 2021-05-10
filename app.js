var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Models
//var Room = require('./models/room');

//Routes
var indexRouter = require('./routes/index');
var roomsRouter = require('./routes/rooms');
var closeRouter = require('./routes/close');


var app = express();
var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  resave: true, // if false don't save session if unmodified
  saveUninitialized: false, // if false don't create session until something stored
  secret: "a saber para que sirve"
}));

// variable de usuario para plantillas de vista
app.use(function(req,res,next){
  if(req.session){
    res.locals.user = req.session;
  }
  next();
});

//Initialize routes
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/close', closeRouter);



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
