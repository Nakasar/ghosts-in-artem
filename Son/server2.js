console.log("Starting...")

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var bonjour = require('bonjour')();

// serve public file
app.use(express.static(path.join(__dirname, 'public')));

var port = 3000;
var hostname = '127.0.0.1';

app.get('/', function (req, res) {
	res.sendFile('views/test.html', {root: __dirname})
});

app.get('/music_list', function (req, res) {
	var array = fs.readdirSync(path.join(__dirname, 'public/audio'));
	var result = {}
	
	array.forEach(function(element){
		
		result[element.toString()] = []
		var a = fs.readdirSync(path.join(__dirname, 'public/audio', element.toString()));
		a.forEach(function(e){
			result[element.toString()].push('audio/'.concat(element, '/', e))
		});
	});
	
	res.send(result);
});

io.on('connection', function(socket){
	console.log('a user connected.');
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	
	socket.on('player statut', function(msg){
		console.log('a player send: ' + msg);
	});
});

app.get('/go_play', function(req, res){
	
	// Procédure pour jouer un son (à mettre n'importe où et le message donne le répertoire)...
	io.emit('someonehere', 'test');
	
});

console.log("...complete!");

http.listen(port, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
});
