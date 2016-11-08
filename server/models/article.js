const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema)
