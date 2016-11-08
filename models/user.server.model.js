'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username : {
    type : String,
    unique : true,
    required : true,
    trim : true
  },
  name : {
    type : String,
    required : true
  },
  password: {
    type : String,
    required : true
  },
  stories : [{
    type: Schema.ObjectId,
    ref : 'Story'
  }]
})

// authenticate input against database documents
userSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}
// hash password before saving to database
userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', userSchema);
module.exports = User;
