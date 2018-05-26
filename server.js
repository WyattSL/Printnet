// server.js
// where your node app starts

// init project
var express = require('express');
var url = require('url');
var q = url.parse('url.href');var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs-extra');

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/home", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/server", function (request, response) {
  response.sendFile(__dirname + '/views/server.html');
});

app.get("/edit", function (request, response) {
  response.sendFile(__dirname + '/views/edit.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
