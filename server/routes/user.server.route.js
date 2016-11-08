'use strict'

const express = require('express');
const router = express.Router();
const User = require('../controllers/user.server.controller');

// Get All Users
router.get('/users', User.list)

// Post user
router.post('/users', User.create)

// Get the user by its title
router.get('/users/:username', User.find)

// Update / PUT the story by its title
router.put('/users/:username', User.update)

// DELETE the story by its title
router.delete('/users/:username', User.delete)

module.exports = router;
