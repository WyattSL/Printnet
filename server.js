// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/check.html');
});

app.get("/home", function (request, response) {
  response.sendFile(__dirname + '/views/check.html');
});

app.get("/index", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/invite", function (request, response) {
  response.sendFile(__dirname + '/views/invite.html');
});

app.get("/discord", function (request, response) {
  response.sendFile(__dirname + '/views/discord.html');
});

app.get("/github", function (request, response) {
  response.sendFile(__dirname + '/views/github.html');
});

app.get("/*", function (request, response) {
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
