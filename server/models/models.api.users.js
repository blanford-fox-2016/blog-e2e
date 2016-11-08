'use strict'

const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

let UsersSchema = new Schema({
  userId    : Number,
  username  : String,
  password  : String,
  article   : [{
    type: Schema.ObjectId,
    ref : 'Articles'
  }]
}, {
  timestamps : true
})

UsersSchema.plugin(passportLocalMongoose)

let user = mongoose.model('Users', UsersSchema)

module.exports = user
