const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        requred : true,
    },
    email: {
        type: String,
        requred : true,
    },
    date: {
        type: Date,
        default : Date.now,
    }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;