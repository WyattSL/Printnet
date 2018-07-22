exports.run = (client, message, args) => {
  let User = message.author
  let Target = message.mentions.members.first()
  message.delete();
  message.channel.send(`${User} Slaped ${Target}!!`)
}