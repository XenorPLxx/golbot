const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const env = require("./env");
const parseString = require("xml2js").parseString;

let prefix = "";
if (env.environment === "dev") {
  prefix = "DEV: ";
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content.match(/^\/golbotall*\w+/)) {
    (async () => {
      const response = await fetch(
        `https://www.gry-online.pl/ajax/xml/gry.asp?search=${escape(
          msg.content.slice(11)
        )}`
      );
      const body = await response.text();
      let responseMessage = "";
      parseString(body, function (err, result) {
        if (result.root && result.root.row && result.root.row.length > 0) {
          result.root.row.forEach(function (row) {
            console.log(JSON.stringify(row));
            responseMessage += `${row.$.name}: ${row.$.url}\n`;
          });
          msg.channel.send(
            `${prefix}Znaleziono ${
              result.root.row.length
            } odpowiedzi na zapytanie o "${msg.content.slice(
              11
            )}":\n${responseMessage}`
          );
        } else {
          msg.channel.send(
            `${prefix}Nie znaleziono odpowiedzi na zapytanie o "${msg.content.slice(
              11
            )}".`
          );
        }
      });
    })();
  } else if (msg.content.match(/^\/golbot*\w+/)) {
    (async () => {
      const response = await fetch(
        `https://www.gry-online.pl/ajax/xml/gry.asp?search=${escape(
          msg.content.slice(8)
        )}`
      );
      const body = await response.text();
      let responseMessage = "";
      parseString(body, function (err, result) {
        if (result.root && result.root.row && result.root.row.length > 0) {
          responseMessage += `${result.root.row[0].$.name}: ${result.root.row[0].$.url}\n`;
          msg.channel.send(
            `${prefix}Znaleziono ${
              result.root.row.length
            } odpowiedzi na zapytanie o "${msg.content.slice(
              8
            )}", aby wyświetlić wszystkie rezultaty użyj polecenia \`/golbotall\`:\n${responseMessage}`
          );
        } else {
          msg.channel.send(
            `${prefix}Nie znaleziono odpowiedzi na zapytanie o "${msg.content.slice(
              8
            )}".`
          );
        }
      });
    })();
  }
});
client.login(env.botToken);
