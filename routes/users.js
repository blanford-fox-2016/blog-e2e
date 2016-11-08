const express = require('express');
const router = express.Router();
const User = require('../controller/user');
// const User = require('../models/user');
/* GET users listing. */
router.post('/logIn', User.login);
router.post('/signUp',User.sigUp);
router.get('/logout',User.logOut)
module.exports = router;
