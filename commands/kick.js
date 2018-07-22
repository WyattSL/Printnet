exports.run = (client, message, [mention, ...reason]) => {
  if (message.member.hasPermission('KICK_MEMBERS', false, true, true)) {
    const Target = message.mentions.members.first();
    
    Target.kick(reason.join(" ")).then(member => {
    message.channel.send(`${member.user.username} was succesfully kicked.`);
    });
  } else {
    message.reply('You do not have permission to execute this command!')
  }
}