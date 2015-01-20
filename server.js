//imports
var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    io      = require('socket.io'),
    Maps    = require('./server/Maps'),
    Game    = require('./server/Game'),
    app     = express();
    
//Server settings
app.set('port', process.env.PORT || 3000);
app.set('mapsdirectory', '../data/map/');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static(path.join(__dirname, 'shared')));

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

var sockets = io.listen(server);
sockets.set('log level', 0);

app.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

//Load instances
var maps = new Maps(app.get('mapsdirectory'));
var game = new Game(sockets);

//Assign instances
app.set('maps', maps);
app.set('game', game);

game.start();