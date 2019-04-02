var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var questions = require('./routes/questions');
var tunnel = require('tunnel-ssh');
var prompt = require('prompt');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var cors = require('cors');

var sshCredentialPromptConfiguration = {
  properties: {
    sshUsername: {
      description: 'Enter ssh username (EECIS username)',     // Prompt displayed to the user. If not supplied name will be used.
      type: 'string',                 // Specify the type of input to expect.
      required: true,                  // If true, value entered must be non-empty.      
    },
    sshPassword: {
      description: 'Enter ssh password (EECIS password)',     // Prompt displayed to the user. If not supplied name will be used.
      type: 'string',                 // Specify the type of input to expect.
      required: true,                  // If true, value entered must be non-empty.
      hidden: true
    }
  }
};

prompt.get(sshCredentialPromptConfiguration, function (err, result) {
  let sshTunnelConfig = {
    username: result.sshUsername,
    host: 'cisc475-7.cis.udel.edu',
    agent: process.env.SSH_AUTH_SOCK,
    port: 22,
    dstPort: 27017,
    password: result.sshPassword
  };

  let server = tunnel(sshTunnelConfig, function (error, server) {
    if (error) {
      console.log("SSH connection error: " + error);
    }
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/rjTestDB', { useNewUrlParser: true });

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function () {
      // we're connected!
      console.log("DB connection successful");
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
