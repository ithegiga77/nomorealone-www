import mongoose from "mongoose";

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
        type: [String],
        required: false,
        unique: false,
        trim: false,
    }
})

const Article = mongoose.model("Article", articleSchema);
export default Article;