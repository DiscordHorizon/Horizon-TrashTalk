let config;
try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.discord = config ? config.discord : process.env.DISCORD;
exports.mongoUri = config ? config.mongoUri : process.env.MONGO_URI;
exports.port = config ? config.port : process.env.PORT;
exports.channel = config ? config.channel : process.env.CHANNEL;
exports.maxWords = config ? config.maxWords : process.env.MAX_WORDS;
