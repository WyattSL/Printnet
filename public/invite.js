function invite() {
  alert('You will now be redirected to Discord OAUTH2 Flow to authorize the discord bot onto a server.', 'Redirection URL');
  location.href="https://discordapp.com/api/oauth2/authorize?client_id=447811226202931204&permissions=8&redirect_uri=https%3A%2F%2Fwww.printnet.glitch.me%2Fsuccess&scope=bot"
}