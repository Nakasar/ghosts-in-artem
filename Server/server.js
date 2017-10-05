var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
user = require('./api/models/giaModel'),
bodyParser = require('body-parser');

// Init mongoDB instance
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/giadb');

app.use(bodyParser.urlencoded({ 'extended': true}));
app.use(bodyParser.json())

var routes = require('./api/routes/giaRoutes');
routes(app);

app.listen(port);

console.log('Ghosts In Artem server started on ' + port);
