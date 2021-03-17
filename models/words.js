const { Schema, model } = require("mongoose");

const Word = new Schema({
    word: String,
    next: Array,
});

module.exports = model("Word", Word);
