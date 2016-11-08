'use strict'
const passport = require('passport')
const User = require('../models/models.api.users')

/*
  * @api {get} /api/users
  * @api purpose get all users
  * @apiName allUsers
  * @apiGroup users
  *
  * @apiSuccess show all user's username {String}
*/
let allUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!users) res.status(404).json({'message': 'Failed to get all users'})
    console.log(`get all users`);
    res.status(200).json(users)
  })
}

/*
  * @api {post} /api/users
  * @api purpose post new user
  * @apiName addUser
  * @apiGroup users
  *
  * @apiSuccess add new user's username {String}
*/
let addUser = (req, res) => {
  console.log(`ini masuk`);
  console.log(req.body);
  User.register({
    userId   : req.body.userId,
    username : req.body.username
    // arcticle id add here
  }, req.body.password, (err, new_user) => {
    console.log(`test`);
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!new_user) res.status(404).json({'message': 'Failed to add new user'})

    passport.authenticate('local')(req, res, () => {
        if (err) {
          return next(err)
        }else{
          res.status(200).json(new_user)// nanti jwt di lempar
        }

    })
  })
}

/*
  * @api {put} /api/users/:id
  * @api purpose put a user
  * @apiName editUser
  * @apiGroup users
  *
  * @apiSuccess edit a user
*/
let editUser = (req, res) => {
  User.findOneAndUpdate({
    userId : req.params.id
  }, req.body, {
    new: true
  }, (err, updated_user) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!updated_user) res.status(404).json({'message': 'Failed to update user'})

    res.status(200).json(updated_user)
  })
}

/*
  * @api {delete} /api/users/:id
  * @api purpose delete a user
  * @apiName deleteUser
  * @apiGroup users
  *
  * @apiSuccess delete a user
*/
let deleteUser = (req, res) => {
  console.log(`params: ${req.params.id}`);
  User.findOneAndRemove({
    userId : req.params.id
  }, (err, deleted_user) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!deleted_user) res.status(404).json({'message': 'Failed to delete user'})
    console.log(deleted_user);
    res.status(200).json(deleted_user)
  })
}

module.exports = {
  allUsers   : allUsers,
  addUser    : addUser,
  editUser   : editUser,
  deleteUser  : deleteUser
}
