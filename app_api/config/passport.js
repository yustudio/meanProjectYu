var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/users');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./serverconfig');

passport.use(new LocalStrategy({
    //local strategy for passport expects username/pw but we 
    //use email as unique ID, so need to set the username field to return email instead 
    usernameField: 'email'
  },
  // verify callback: find the user that possesses a set of credentials
  // verify callback for local authentication accepts username and password arguments,
  // which  are submitted to the application via a login form
  function(username, password, done) {

    console.log("-------------in passport LocalStrategy");
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
      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object to make available at req.user
      return done(null, user);
    });
  }
));


//exports.facebook = 
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ OauthId: profile.id }, function(err, user) {
      if(err) {
        console.log(err); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          username: profile.displayName
        });
        user.OauthId = profile.id;
        user.OauthToken = accessToken;
        user.save(function(err) {
          if(err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));
