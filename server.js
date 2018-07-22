require('./bot.js').run();
// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('./utils.js');
app.use(bodyParser.urlencoded({ extended: true }));
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = 'https://printnet.glitch.me/callback'
const BotToken = process.env.TOKEN

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request,response) => {
  response.sendFile(__dirname + '/views/check.html');
});

app.get("/add", async (request,response) => {
  const check = (guild) => {
    if (!guild) response.redirect('/login');
  };
  const url = '?'+request.url.split('?')[1];
  let guild = getParam('server',url);
  check(guild);
  let rurl = getParam('redirect',url);
  guild = await fetch(`https://discordapp.com/api/guilds/${guild}`,
  {
    method: "GET",
    headers: {
      Authorization: `Bot ${BotToken}`,
    }, 
  });
  if (!guild) return response.redirect('/invite');
  guild = await guild.json();
  if (!guild) return response.redirect('/invite');
  response.redirect(rurl);
});

app.get("/home", (request,response) => {
  response.sendFile(__dirname + '/views/check.html');
});

app.get("/index", (request,response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/invite", (request,response) => {
  response.sendFile(__dirname + '/views/invite.html');
});

app.get("/discord", (request,response) => {
  response.sendFile(__dirname + '/views/discord.html');
});

app.get("/github", (request,response) => {
  response.sendFile(__dirname + '/views/github.html');
});

app.get("/dashboard", (request,response) => {
  response.sendFile(__dirname + '/views/dashboard.html');
});

app.get("/dash", (request,response) => {
  response.sendFile(__dirname + '/views/dash.html');
});

app.get("/config/*", (request,response) => {
  response.sendFile(__dirname + '/views/config.html');
});

app.get("/api/config/*", (request,response) => {
  response.sendFile(`${__dirname}/config/${request.url.slice(("/api/config/").length)}.json`);
});
/*
app.post("/api/write", (request,response) => {
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
    const querystring = '?'+response.url.split('?')[1];
    const file = request.url.slice(("/api/write/").length);
    const token = process.env.WRITE_TOKEN;
    if (file.length<1) {
      response.write('{"message":"Specify A File Name"}');
      response.end();
    };
    const fs = require('fs');
    fs.writeFile(file, 'Hello World!', function (err) {
    if (err) {
      response.write('{"message":"'+err+'"}');
      response.end();
    };
    console.log('Wrote Hello World in file helloworld.txt, just check it');
  });
  response.write(`{"message":"Wrote ${file}"}`)
  response.end();
});
*/

app.get('/login', (request, response) => {
  response.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds%20email&response_type=code&redirect_uri=${redirect}`);
});

app.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  res.redirect(`/dash/?token=${json.access_token}`);
}));

app.get("/*", (request,response) => {
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});