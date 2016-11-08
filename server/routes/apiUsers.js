'use strict'
const express = require('express');
let router = express.Router();
const apiUser = require('../controllers/apiUserController');
const passport = require('passport');

/* GET home page. */
router.get('/', apiUser.allUsers);
router.post('/', apiUser.register);
router.post('/login', apiUser.login);
router.get('/:username', apiUser.getSingleUser);
router.put('/:id', apiUser.updateUser);
router.delete('/:id', apiUser.deleteUser);

module.exports = router;
