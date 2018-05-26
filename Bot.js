const Discord = require("discord.js");
const client = new Discord.Client;
const fs = require("fs-extra");
const shortid = require("shortid");


const PublicConfig = require("./Public-Config.json");
const Token = PublicConfig.Token;
const Prefix = PublicConfig.DefaultPrefix;
const Whitelist = PublicConfig.Whitelisted;
const WA = PublicConfig.Warnings;


client.on('ready', () => {
  console.log(`Logged in.`);
});

client.on('message', msg => {
  if (msg.author.bot) return; //Ignore Other Bots
  if (!msg.content.startsWith(Prefix)) return; //Ignore Any Message without the command prefix
  if (msg.channel.type == "dm") return; //Ignore DM Messages.
});

client.on('guildCreate', guild => {
  let GuildID = shortid.generate();
  let GuildName = guild.name;
  let IDGuild = guild.id;
  console.log(`Guild ID: ${GuildID} - Guild Name: ${GuildName}`);
  fs.copy(`./DefaultConfig.json`, `./guilds/${GuildID}`, {overwrite: false, errorOnExist: false,});
  fs.writefile(`./id/${IDGuild}.txt`, `${GuildID}`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

client.login(Token);