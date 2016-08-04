var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/users');

passport.use(new LocalStrategy({
    //local strategy for passport expects username/pw but we 
    //use email as unique ID, so need to set the username field to return email instead 
    usernameField: 'email'
  },
  // verify callback: find the user that possesses a set of credentials
  // verify callback for local authentication accepts username and password arguments,
  // which  are submitted to the application via a login form
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      // Node server error
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object to make available at req.user
      return done(null, user);
    });
  }
));