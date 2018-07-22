  exports.run = (client) => {
  let config = require('../configuration.json')
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  if (config.Maintence == true) {
    client.user.setPresence({ game: { name: 'Maintence Mode ON'}, status: 'dnd' });
  } else {
    client.user.setPresence({ game: { name: 'With the guild!'}, status: 'online' });
  }
}