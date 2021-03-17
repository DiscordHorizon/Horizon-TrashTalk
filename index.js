const Discord = require("discord.js");
const { discord, channel } = require("./utils/horizonUtils");
const { createDict, genText } = require("./include/words");

require("./database");

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("[Bot] Connected");
});

bot.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.channel.id != channel) return;

    createDict(message.content);
    genText(message);
});

bot.login(discord);
