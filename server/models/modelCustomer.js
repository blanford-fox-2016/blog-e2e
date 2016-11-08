'use strict'

var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var customerSchema = mongoose.Schema({
    id : String,
    username : String
},{
  timestamps : true
});

// use plugin mongoose
customerSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model('customers', customerSchema);
// module.exports  = mongoose.model('[nama collection di database]', customerSchema);
