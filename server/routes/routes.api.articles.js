var express = require('express');
var router = express.Router();

const controller = require('../controllers/controller.api.articles')

/* GET All Articles. */
router.get('/', controller.allArticles)

/* Process New Article. */
router.post('/', controller.addArticle);

/* Process Seeder Article. */
router.post('/seed', controller.seedArticle);

/* Process Delete All Articles. */
router.delete('/delete', controller.deleteAll);

/* Process Edit a Article. */
router.put('/:id', controller.editArticle);

/* Process Delete a Article. */
router.delete('/:id', controller.deleteArticle);

module.exports = router;
