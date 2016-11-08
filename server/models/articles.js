const mongoose = require('mongoose');

let articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  slug: String
});

let articles = mongoose.model('articles', articlesSchema)

module.exports = articles
