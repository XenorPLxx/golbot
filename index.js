const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const env = require("./env");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  } else if (msg.content.match(/^\/golbot*\w+/)) {
    (async () => {
      const response = await fetch(
        `https://www.gry-online.pl/ajax/xml/gry.asp?search=${escape(
          msg.content.slice(8)
        )}`
      );
      const body = await response.text();
      console.log(body);
      msg.reply(
        `pytanie o https://www.gry-online.pl/ajax/xml/gry.asp?search=${escape(
          msg.content.slice(8)
        )}, odpowiedz:\n${body}`
      );
    })();
  }
});
client.login(env.botToken);
