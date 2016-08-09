var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./app_api/config/passport');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanAppYu');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//var routes = require('./routes/index');
//var users = require('./routes/users');

//Bring in the routes for the API 
var routesApi = require('./app_api/routes/index');

var app = express();

// Secure traffic only
app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

 res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

//app.use('/', routes);
//app.use('/users', users);

//Use the API routes when path starts with /api
app.use('/api', routesApi);

// Render the index.html page for the Angular SPA
// This means we don't have to map all of the SPA routes in Express
// Let Angular frontend determines the endpoints
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
