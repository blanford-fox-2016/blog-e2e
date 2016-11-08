'use strict'

const Story = require('../models/story.server.model');


module.exports = {
  create: (req, res) => {
    var newStory = {
      title : req.body.title,
      main  : req.body.main
    }
    Story.create(newStory)
      .then(story => res.json(story))
      .catch(err => res.json(err))
  },

  list: (req, res) => {
    Story.find({})
      .then(stories => res.json(stories))
      .catch(err => res.json(err))
  },

  find: (req, res) => {
    Story.findOne({ title : req.params.title })
      .then(story => res.json(story))
      .catch(err => res.json(err))
  },

  update: (req, res) => {
    Story.findOneAndUpdate({ title : req.params.title })
      .then(story => res.json(story))
      .catch(err => res.json(err))
  },

  delete: (req, res) => {
    Story.findOneAndRemove({ title : req.params.title})
      .then(() => res.json({ message : 'its been deleted'}))
      .catch(err => res.json(err))
  }
}
