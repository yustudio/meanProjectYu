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
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');

// checks JWT and throw if not valid JWT, which is caught in app.js as "UnauthorizedError"
router.get('/profile', auth, ctrlProfile.profileRead); 

// authentication
router.post('/register', ctrlAuth.register);

// protect the /login endpoint since login method uses passport to authenticate first
router.post('/login', ctrlAuth.login);    


// send user to facebook for login
router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){
   // res.header('Access-Control-Allow-Origin', "*");
console.log("------------------------"+JSON.stringify(res));
  });

// called after facebook is logged in successfully
router.get('/facebook/callback', function(req,res,next){
  consolelog("-------------facebook/callback being called")
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });

   // res.header('Access-Control-Allow-Origin', "*");
  })(req,res,next);
});



module.exports = router;