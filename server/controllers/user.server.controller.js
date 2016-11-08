'use strict'

const User = require('../models/user.server.model');
const bcrypt = require('bcrypt');

module.exports = {
  create: (req, res) => {
    var userData = {
      username : req.body.username,
      name : req.body.name,
      password : req.body.password
    }
    //console.log(userData);
    User.create(userData)
      .then(user => res.json(user))
      .catch(err => res.json(err))
  },

  list: (req, res) => {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  find: (req, res) => {
    User.findOne({ username : req.params.username })
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  update: (req, res) => {
    // collecting related fields to some variables
    var params = {
      username : req.params.username
    }

    var userData = {
      name : req.body.name
    }
    var option = {
      new : true,
      upsert : true
    }
    // find one and update the data
    User.findOneAndUpdate(params , userData , option)
      .then(user => res.json(user))
      .catch(err => res.json(err))
  },

  delete: (req, res) => {
    User.findOneAndRemove({username : req.params.username})
      .then(() => res.json({message : `${req.params.username} has been deleted`}))
      .catch(err => res.json(err))
  },

  deleteAll: () => {
    User.remove({})
      .then(() => res.json({ message : 'all users have been deleted'}))
      .catch(err => res.json(err))
  }

}
