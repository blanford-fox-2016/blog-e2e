const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userId: Number,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)
            },
            message: `format email salah`
        },
    },
    blog: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

User.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', User)