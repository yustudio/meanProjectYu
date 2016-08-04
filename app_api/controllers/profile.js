var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // ERROR CASE OF WHEN USER ISN'T FOUND
    //http://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
    // findById(id, callback) is the same as findById(id).exec(callback)
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
