const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required : true,
    },
    done: {
        type: Boolean,
        required : true,
    },
    user: {
        type: String,
        required : true,
    }

});

const todoModel = mongoose.model("todos", todoSchema);
module.exports = todoModel;