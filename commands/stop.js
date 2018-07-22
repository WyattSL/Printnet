exports.run = (client, message, args) => {
    const config = require('../configuration.json');
    if (!message.author.id == config.OwnerID) return;
    console.log('Reboot Command Executed');
    message.channel.send("Rebooting... Standby.");
    client.destroy()
    .catch(console.error);
}