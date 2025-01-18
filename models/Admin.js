const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
})

module.exports = mongoose.model("Admin", adminSchema)