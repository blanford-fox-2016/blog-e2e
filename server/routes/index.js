var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.server.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
