var express = require('express');
var router = express.Router();
const Blog = require('../controller/blog');

/* GET home page. */

router.get('/',Blog.showAll);

router.put('/:id',Blog.update);

router.post('/',Blog.create);

router.delete('/:id',Blog.deleteBlog);

module.exports = router;
