const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred : true,
    },
    email: {
        type: String,
        requred : true,
    },
    age: {
        type: Number,
        requred : true,
    }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;