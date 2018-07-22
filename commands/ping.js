exports.run = (client, message, args) => {
    message.channel.send("pong!")
    console.log('Ping Command Executed')
    .catch(console.error);
}