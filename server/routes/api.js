const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const passport = require('passport');


// -----------------------------------------------------------------------------
// CRUD ARTICLE
// -----------------------------------------------------------------------------

router.get('/article', controller.getAllArticles);
router.post('/article', controller.postNewArticle);
router.get('/article/:id', controller.findOneArticle)
router.put('/article/:id', controller.updateArticle)
router.delete('/article/:id', controller.deleteArticle)


// -----------------------------------------------------------------------------
// User Authentication (Register & Login)
// ------------------------------------------------------------------------------

router.post('/register', controller.registerUser)
router.post('/login', controller.loginProcess)

module.exports = router;
