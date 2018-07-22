exports.run = (client, message, [mention, ...reason]) => {;
  let Target = message.mentions.users.first() || message.author;
  let URL = Target.avatarURL
  message.channel.send(URL);
}