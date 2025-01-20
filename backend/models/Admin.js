import mongoose from "mongoose";

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

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;