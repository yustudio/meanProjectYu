var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
var config = require('../config/serverconfig.js');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    uniqueCaseInsensitive: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },  
  hash: String,
  salt: String,   // randomly generated
  OauthId: String,
  OauthToken: String
});

userSchema.plugin(uniqueValidator);

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

// genereate JSON web token (JWT)
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.jwtSecret);
};

module.exports = mongoose.model('User', userSchema);
