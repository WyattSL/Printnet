const Discord = require("discord.js");
const client = new Discord.Client;
const fs = require("fs-extra");
const shortid = require("shortid");


const Auth = require("./Auth.json");
const Token = Auth.Token;
var JsonLoaded = false;

function LoadConfig() {
  const Prefix = Config.Prefix;
  const BotName = Config.BotName
  const OwnerID = Config.Owner
  const Ban = Config.Ban
  const Kick = Config.Kick
  const Mute = Config.Mute
}

client.on('ready', () => {
  console.log(`Logged in.`);
});

client.on('message', msg => {
  if (msg.channel.type == "dm") return; //Ignore DM Messages.
  if (JsonLoaded == false) { //Load Guild's Json Configuration File
    let GuildID = msg.guild.id
    fs.readfile(GuildID, 'utf8', function(err, data) {
      if (err) throw (err);
      let IDGuild = data;
      const Config = require(`./id/${IDGuild}.json`);
      LoadConfig()
    });
  }
  if (msg.author.bot) return; //Ignore Other Bots
  if (!msg.content.startsWith(Prefix)) return; //Ignore Any Message without the command prefix
  if (msg.content == Prefix + 'setup') {
    if (!msg.author.hasPermission('ADMINISTRATOR', false, true, true)) return;
    let User = msg.author
    let IDGuild = msg.guild.id
    console.log(`${User} Has Forced A SETUP On Guild ${GuildID}`);
    msg.channel.send(`Warning. ${User} Has forced a Guild Setup. If you executed a SETUP command, and the bot does not work, Please contact me at WyattPlayz#5378`);
  let GuildID = shortid.generate();
  let GuildName = msg.guild.name;
  console.log(`Guild ID: ${GuildID} - Guild Name: ${GuildName}`);
  fs.copy(`./DefaultConfig.json`, `./guilds/${GuildID}`, {overwrite: false, errorOnExist: false,});
  fs.writefile(`./id/${IDGuild}.txt`, `${GuildID}`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  var JsonLoaded = false;
  msg.guild.createRole('Muted', 'DARK_GREY', false, 1, 1114177, true);
  msg.guild.createRole('Member', 'DARK_RED', false, 2, 103929921, true);
  msg.channel.send('Some roles have been created. You may edit there permissions, Position, Color, And anything else, BUT DO NOT DELETE Them, OR CHANGE THE NAME, or the bot WILL NOT FUNCTION.');
  msg.channel.send('I also suggest Removing any permissions from the @everyone role. Otherwise, it could cause conflict with the MUTED role.');
  };
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
  var JsonLoaded = false;
  guild.createRole('Muted', 'DARK_GREY', false, 1, 1114177, true);
  guild.createRole('Member', 'DARK_RED', false, 2, 103929921, true);
  guild.systemChannel.send('Some roles have been created. You may edit there permissions, Position, Color, And anything else, BUT DO NOT DELETE Them, OR CHANGE THE NAME, or the bot WILL NOT FUNCTION.');
  guild.systemChannel.send('I also suggest Removing any permissions from the @everyone role. Otherwise, it could cause conflict with the MUTED role.');
});

client.login(Token);