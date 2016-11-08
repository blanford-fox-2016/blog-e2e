var express = require('express');
var router = express.Router();
const controller = require('../controller/controllerCustomer')

/* GET home page. */
router.get('/', controller.getAllCustomer);
router.post('/', controller.insertCustomer);
router.put('/', controller.updateCustomer);
router.delete('/', controller.deleteCustomer);

module.exports = router;
