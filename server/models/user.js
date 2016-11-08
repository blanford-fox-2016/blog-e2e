const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
