console.log("Starting...")

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var appserver = http.createServer(app);
var path = require('path');
var io = require('socket.io')(appserver);
var noble = require('noble');

// pour les requetes html
port = process.env.PORT || 3030,
	bodyParser = require('body-parser')

// serve public file
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
const hostname = '127.0.0.1'

app.route('/:server_address/found/:bt_address').get(function (req, res) {
	var server = req.params.server_address;
	var user_bt = req.params.bt_address;

	console.log('Send a request to ' + server + " for address " + user_bt);

	http.get({
		hostname: server,
		port: 3000,
		path: '/users/phones'
	}, (response) => {
		var data = '';
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			result = JSON.parse(data);
			console.log(result);
			res.json(JSON.parse(data));
		});
	}).on('error', (err) => {
		//console.log("Error: " + err.message);
	});
});

var connected_user = [];
app.get('/', function (req, res) {
	res.sendfile('views/test.html', { root: __dirname });
	http.get({
		hostname: '192.168.1.206',
		port: 3000,
		path: '/users/phones'
	}, (response) => {
		var data = '';
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			result = JSON.parse(data);
			console.log(result);
			connected_user = result;
		});
	}).on('error', (err) => {
		//console.log("Error: " + err.message);
	});


});

app.get('/detect', function (req, res) {
	setInterval(function () {
		noble.startScanning([], true);
		noble.on('discover', function (peripheral) {
			for (var i = 0; i < connected_user.length; i++) {
				if (peripheral.address === connected_user[i]["bt_mac"]) {
					http.get({
						hostname: '192.168.1.206',
						port: 3000,
						path: '/users/' + connected_user[i]["_id"]
					}, (response) => {
						var data = '';
						response.on('data', (chunk) => {
							data += chunk;
						});
						response.on('end', () => {
							result = JSON.parse(data);
							console.log(result);
						});
					}).on('error', (err) => {
						//console.log("Error: " + err.message);
					});
					io.emit('someonehere', 'Go play, noob!');
					console.log('Discovered Peripheral : ' + peripheral.address + ' RSSI:' + peripheral.rssi)

				}
			}
		});
	}, 2000)
})

app.get('/music_list', function (req, res) {
	var array = fs.readdirSync(path.join(__dirname, 'public/audio'));
	var result = []

	array.forEach(function (element) {
		result.push("audio/".concat(element));
	});

	res.send(result);
});

io.on('connection', function (socket) {
	console.log('a user connected.');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('player statut', function (msg) {
		console.log('a player send: ' + msg);
	});
});

app.get('/go_play', function (req, res) {

	// Procédure pour jouer un son (à mettre n'importe où et le message osef)...
	io.emit('someonehere', 'Go play, noob!');

});

console.log("...complete!");

appserver.listen(port, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
});
