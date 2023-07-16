const mongoose = require('mongoose');

const slugify = require('slugify-mongoose')
const Schema = mongoose.Schema


// Users todo list
const todoListSchema = new Schema({
    todoTitle: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})


// Users Card Document
const todoCardSchema = new Schema({
    cardTitle: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    todos: {
        type: Array
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: String,
        default: new Date(),
        immutable: true
    },
    slug: {
        type: String,
        slug: 'cardTitle',
        unique: true
    }
});

// Users Todo Document
const todoUserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    todoCard: {
        type: Array
    },
    slug: {
        type: String,
        required: true
    }
});

todoCardSchema.plugin(slugify)


const todoUserModel = mongoose.model('todos', todoUserSchema)
const todoCardModel = mongoose.model('card', todoCardSchema)
const todoListModel = mongoose.model('list', todoListSchema)

module.exports = { todoUserModel, todoListModel, todoCardModel}