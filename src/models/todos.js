const mongoose = require("mongoose");
const validator = require("validator");
// const { boolean } = require("webidl-conversions");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        maxlength: 500
    },
    active: {
        type: Boolean,
        default: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Todo = new mongoose.model('Todo', todoSchema);

module.exports = Todo;