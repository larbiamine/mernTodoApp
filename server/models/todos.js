const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        requred : true,
    },
    done: {
        type: Boolean,
        requred : true,
    },

});

const todoModel = mongoose.model("todos", todoSchema);
module.exports = todoModel;