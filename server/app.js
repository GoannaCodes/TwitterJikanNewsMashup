var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
require('dotenv').config();
// this is also for port sharing
// const port = 3000;

var newsRouter = require('./routes/news');
var tweetRouter = require('./routes/tweets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// change this to app.use(express.static('../client/build')); when both are done
// this enables both react and express to run on same port
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/news', newsRouter);
app.use('/tweets', tweetRouter);

/* 
app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port`})
})
*/

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
