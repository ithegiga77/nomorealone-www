const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    description: {
        type: String,
        required: true,
        unique: false,
        trim: false
    },
    images: {
        type: String,
        required: false,
        unique: false,
        trim: true,
    }
})

module.exports = mongoose.model("Article", articleSchema);