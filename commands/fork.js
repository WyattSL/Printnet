exports.run = (client, message, args) => {
  let User = message.author
  let Target = message.mentions.members.first()
  message.delete();
  message.channel.send(`${User} Stuck a fork in ${Target}!`)
}