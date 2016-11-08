'use strict'

var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
    id : String,
    title : String,
    content : String
},{
  timestamps : true
});

module.exports  = mongoose.model('blogs', blogSchema);
// module.exports  = mongoose.model('[nama collection di database]', customerSchema);
