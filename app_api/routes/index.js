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


// checks JWT and throw if not valid JWT, which is caught in app.js as "UnauthorizedError"
router.get('/profile', auth, ctrlProfile.profileRead); 

// authentication
router.post('/register', ctrlAuth.register);

// protect the /login endpoint since login method uses passport to authenticate first
router.post('/login', ctrlAuth.login);    

module.exports = router;
