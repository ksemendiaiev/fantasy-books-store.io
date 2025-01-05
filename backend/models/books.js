const mongoose = require("mongoose");

const book = new mongoose.Schema({
        url: {
            type: String,
            required: true,
            unique: true

        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        owner: {
           type: mongoose.Schema.Types.ObjectId, // Используем ObjectId
        ref: "user", // Ссылаемся на модель User
            required: true,
        },
     },  {timestamps: true})

module.exports = mongoose.model("books", book);