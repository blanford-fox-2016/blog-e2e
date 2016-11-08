'use strict'
const express = require('express');
let router = express.Router();
const apiArticle = require('../controllers/apiArticleController');

/* GET home page. */
router.get('/', apiArticle.allArticles);
router.post('/', apiArticle.postNewArticle);
router.get('/:slug', apiArticle.getSingleArticle);
router.put('/:id', apiArticle.updateArticle);
router.delete('/:id', apiArticle.deleteArticle);

module.exports = router;
