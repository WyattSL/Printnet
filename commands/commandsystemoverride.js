exports.run = (client, message, args) => {
    const config = require('../configuration.json');
    if (!message.author.id == config.OwnerID) return;
    message.delete()
    message.channel.send("DOS Attack Detected. Stopping...");
    message.channel.send("Minimal Damage Detected.");
    
}