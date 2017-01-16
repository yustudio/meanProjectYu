var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');

// var sendJSONresponse = function(res, status, content) {
//   res.status(status);
//   res.json(content);
// };

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

console.log("--------------Registering in DB");

	var user = new User();

	// MISSING ERROR TRAPS: validate form input
  // Use of bodyparser allows `req.body` to be filled in with the HTML form elements
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.email = req.body.email;

	user.setPassword(req.body.password);

	// MISSING ERROR TRAPS: catch throws from save
	user.save(function(err) {

    if (err) {
      console.log(err);      
      // after res status and json content is set, res will be sent
      // to frontend. res can not be modified anymore
      res.status(400).json(err);
      return;
    };

		console.log("--------------Save user to DB");
    console.log(JSON.stringify(user));
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
		  "token" : token
		});
	});

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  console.log("--------------in log in ");

  passport.authenticate('local', function(err, user, info){
    var token;

    console.log("passport authenticate --- user: " + user);

    // If Passport throws/catches an error
    if (err) {
      console.log("passport err")
      res.status(404).json(err.message);
      return;
    }

    // If a user is found
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
  })(req, res);

};