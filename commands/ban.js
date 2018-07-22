exports.run = (client, message, [mention, ...reason]) => {
  if (message.member.hasPermission('BAN_MEMBERS', false, true, true)) {
    const Target = message.mentions.members.first();
    
    Target.ban(reason.join(" ")).then(member => {
    message.channel.send(`${member.user.username} was succesfully Banned.`);
    });
  } else {
    message.reply('You do not have permission to execute this command!')
  }
}