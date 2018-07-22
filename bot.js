const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const config = require("./configuration.json");
const update = true;

module.exports.run = async () => {
  if (update)
    console.log('bot started') 
  else
    return console.log('bot not started');

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (!prefix) {
    prefix = config.prefix;
  };
  if(message.content.indexOf(prefix) !== 0) return;
  console.log('Detected Possible Command')
  if (config.Maintence == true) {
    message.channel.send('Sorry! Maintence mode is ON. Commands are disabled!');
    console.log('MAINTENCE MODE ON. COMMANDS DISABLED.');
    return;
  }
  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(`Command Executed: ${command} - Args: ${args}`)

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});
client.login(process.env.TOKEN);
};