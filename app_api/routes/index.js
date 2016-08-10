var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  //property to create on the req object to hold the token info after auth passes
  userProperty: 'payload' 
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


// checks JWT and throw if not valid JWT, which is caught in app.js as "UnauthorizedError"
router.get('/profile', auth, ctrlProfile.profileRead); 

// authentication
router.post('/register', ctrlAuth.register);

// protect the /login endpoint since login method uses passport to authenticate first
router.post('/login', ctrlAuth.login);    


// send user to facebook for login
router.get('/facebook', passport.authenticate('facebook', {scope:'email'}),
  function(req, res){
  });

// called after facebook is logged in successfully
router.get('/facebook/callback', function(req,res,next){
  console.log("-------------facebook/callback being called")
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }

    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      console.log("passport user not found")
      res.status(401).json(info);
    }

   // res.header('Access-Control-Allow-Origin', "*");
  })(req,res,next);
});



module.exports = router;