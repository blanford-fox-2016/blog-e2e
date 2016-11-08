'use strict'

const express = require('express');
const router = express.Router();
const Story = require('../controllers/story.server.controller');

// Get All Stories
router.get('/stories', Story.list)

// Post the story
router.post('/stories', Story.create)

// Get the story by title
router.get('/stories/:title', Story.find)

// Update / PUT the story by its title
router.put('/stories/:title', Story.update)

// DELETE the story by its title
router.delete('/stories/:title', Story.delete)

module.exports = router
