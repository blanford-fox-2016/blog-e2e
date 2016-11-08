const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let blogSchema = new Schema ({
  postId: {type:String,unique: true},
  title: String,
  content: String
})

module.exports = mongoose.model('Blog',blogSchema)
