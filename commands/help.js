exports.run = (client, message, args) => {
  let User = message.author
  message.channel.send(`Hello, ${User}! I am Printnet, Programmed By WyattPlayzPC. Type !commands for a list of commands.`)
}