const wordModel = require("../models/words");
const { maxWords } = require('../utils/horizonUtils');

module.exports = {
    async createDict(text) {
        const grams = text
            .toLowerCase()
            .replace(/\r?\n|\r/g, " ")
            .split(" ");

        grams.forEach(async (gram, index) => {
            if (gram != "") {
                const wordCheck = await wordModel.findOne({ word: gram });
                if (index < grams.length - 1) {
                    var next = grams[index + 1];
                    if (!wordCheck) {
                        const newWord = new wordModel({
                            word: gram,
                            next: [],
                        });
                        await newWord.save();
                    }
                    if (next != "") {
                        await wordModel.findOneAndUpdate(
                            { word: gram },
                            { $push: { next } }
                        );
                    }
                }
            }
        });
    },
    async genText(message) {
        const grams = message.content
            .toLowerCase()
            .replace(/\r?\n|\r/g, " ")
            .split(" ");

        let currentWord = grams[Math.floor(Math.random() * grams.length)];
        let result = currentWord;

        for (var i = 0; i < maxWords; i++) {
            const possibility = await wordModel.findOne({
                word: currentWord,
            });
            if (possibility) {
                var next =
                    possibility.next[
                        Math.floor(Math.random() * possibility.next.length)
                    ];

                result = `${result} ${next}`;
                currentWord = next;
            }
        }

        message.channel.send(result);
    },
};
