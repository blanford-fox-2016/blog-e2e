var express = require('express');
var router = express.Router();

const controller = require('../controllers/controller.api.users')

/* GET All Users. */
router.get('/', controller.allUsers)

/* Process New User. */
router.post('/', controller.addUser);

/* Process Edit a User. */
router.put('/:id', controller.editUser);

/* Process Delete a User. */
router.delete('/:id', controller.deleteUser);

module.exports = router;
