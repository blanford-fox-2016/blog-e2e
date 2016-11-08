var express = require('express');
var router = express.Router();
const userController = require('../controllers/controller.api.users')

router.get('/user/seed', userController.seedUser)
router.get('/user', userController.getUser)
router.get('/user/:userId', userController.getUserById)
router.post('/register', userController.localRegister)
router.post('/login', userController.loginUser)
router.delete('/user/delete', userController.deleteAllUser)
router.delete('/user/delete/:userId', userController.deleteUserByPostId)
router.put('/user/update/:userId', userController.updateUser)
router.post('/user/search', userController.searchUser)

module.exports = router;
