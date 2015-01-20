//imports
var express     = require('express'),
    app         = express(),
    http        = require('http'),
    io          = require('socket.io'),
    tmx         = require('tmx-parser'),
    Maps        = require('./Maps'),
    Game        = require('./Game');

//Server settings
app.set('port', 1337);
app.set('mapsdirectory', '../data/map/');

//Create server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Server started listening on port " + app.get('port'));
});

//Open socket
var socket = io.listen(server);

//Load instances
var maps = new Maps(app.get('mapsdirectory'));
var game = new Game(socket);

//Assign instances
app.set('maps', maps);
app.set('game', game);

//Start the server
game.start();