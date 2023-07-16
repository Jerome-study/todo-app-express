const mongoose = require('mongoose');
const Schema = mongoose.Schema
const slugify = require('slugify-mongoose')
const userSchema = new Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date().toLocaleDateString(),
        immutable: true
    },
    slug: {
        type: String,
        slug: 'username',
        unique: true
    }

});

userSchema.plugin(slugify)




module.exports = mongoose.model('users', userSchema, 'users');