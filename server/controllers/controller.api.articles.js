'use strict'

const Article = require('../models/models.api.articles')

/*
  * @api {get} /api/articles
  * @api purpose get all articles
  * @apiName allArticles
  * @apiGroup articles
  *
  * @apiSuccess show all article's content {String}
*/
let allArticles = (req, res) => {
  Article.find({}, (err, articles) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!articles) res.status(404).json({'message': 'Failed to get all articles'})

    res.status(200).json(articles)
  })
}

/*
  * @api {post} /api/articles
  * @api purpose post new article
  * @apiName addArticle
  * @apiGroup articles
  *
  * @apiSuccess add new article's content {String}
*/
let addArticle = (req, res) => {
  Article.create({
    content: req.body.content,
    articleId: req.body.articleId,
    userId: req.body.userId
  }, (err, new_article) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!new_article) res.status(404).json({'message': 'Failed to add article'})

    res.status(200).json(new_article)
  })
}

/*
  * @api {put} /api/articles/:id
  * @api purpose put a article
  * @apiName editArticle
  * @apiGroup articles
  *
  * @apiSuccess update a specific article's content {String}
*/
let editArticle = (req, res) => {
  Article.findOneAndUpdate({
    articleId : req.params.id
  }, req.body, {
    new : true
  }, (err, edited_article) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!edited_article) res.status(404).json({'message': 'Failed to edit article'})

    res.status(200).json(edited_article)
  })
}

/*
  * @api {delete} /api/articles/:id
  * @api purpose delete one specific article
  * @apiName deleteArticle
  * @apiGroup articles
  *
  * @apiSuccess delete article's content {String}
*/
let deleteArticle = (req, res) => {
  Article.findOneAndRemove({
    articleId : req.params.id
  }, (err, deleted_article) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!deleted_article) res.status(404).json({'message': 'Failed to delete article'})

    res.status(200).json(deleted_article)
  })
}

module.exports = {
  allArticles   : allArticles,
  addArticle    : addArticle,
  editArticle   : editArticle,
  deleteArticle  : deleteArticle
}
