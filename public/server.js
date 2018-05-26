function EnterGuildID() {
  var GuildID = prompt("Enter Your Guild ID!");
  if (GuildID == "" || GuildID == "null") {
    return;
  } else {
    location.href='https://www.printnet.glitch.me/edit';
  }
}