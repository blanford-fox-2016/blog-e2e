'use strict'
const article = require('../models/article')
const ModelUser = require('../models/user')
const passport = require('passport');

module.exports = {
    getAllArticles: function(req, res, next) {
        article.find({}, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    postNewArticle: function(req, res, next) {
        article.create({
            id: 1,
            title: req.body.title,
            content: req.body.content,
        }, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    findOneArticle: function(req, res, next) {
        article.findOne({
            id: req.params.id
        }, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    updateArticle: function(req, res, next) {
        article.update({
            id: req.params.id
        }, {
            title: req.body.title,
            content: req.body.content
        }, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    deleteArticle: function(req, res, next) {
        article.remove({
            id: req.params.id
        }, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    registerUser: function(req, res, next) {
        ModelUser.register({
            name: req.body.name,
            username: req.body.username
        }, req.body.password, function(err, result) {
            if (err) {
                res.json(err)
            } else {
                passport.authenticate('local')(req, res, function() {
                    if (err) {
                        return next(err)
                    } else {
                        res.json(result)
                    }
                })
            }
        })
    },
    loginProcess: function(req, res, next) {

        passport.authenticate('local', (err, user, info) => {
            res.send({ id: user._id, username: user.username, name: user.name })
        })(req, res, next)

    }

}
