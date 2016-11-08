const Blog = require('../models/blog')



module.exports = {

    seedBlog: function (req, res) {
        const data = [
            {
                postId: '1',
                title: 'title a',
                description: 'description a'
            },
            {
                postId: '2',
                title: 'title b',
                description: 'description b'
            },
            {
                postId: '3',
                title: 'title c',
                description: 'description c'
            },
            {
                postId: '4',
                title: 'title d',
                description: 'description d'
            },
            {
                postId: '5',
                title: 'title e',
                description: 'description e'
            }
        ]

        Blog.create(data, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getBlog: function (req, res) {
        Blog.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    addBlog: function (req, res) {
        const blog = {
            postId: req.body.id,
            title: req.body.title,
            description: req.body.description
        }

        Blog.create(blog, function (err, data) {
            if (err) res.json(err)
            else {
                res.json(data)
            }
        })
    },

    deleteAllBlog: function (req, res) {
        Blog.remove({}, function (err) {
            if (err) res.json(err)
            else res.json("All Blog Deleted")
        })
    },

    deleteBlogByPostId: function (req, res) {
        Blog.findOneAndRemove({
            postId: req.params.postId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    updateBlog: function (req, res) {
        Blog.findOneAndUpdate({
            postId: req.params.postId
        }, {
            postId: '7',
            title: 'title update',
            description: 'description update'
        }, {
            new: true,
            upsert: true
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    }

}
