var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
user = require('./api/models/UserModel'),
station = require('./api/models/StationModel')
bodyParser = require('body-parser')
cors = require('cors');

// Init mongoDB instance
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/giadb', { useMongoClient: true });

app.use(bodyParser.urlencoded({ 'extended': true}));
app.use(bodyParser.json())

app.use(cors());

var apiRoutes = express.Router();
var routes = require('./api/routes/giaRoutes');

app.all('/*',function(req, res, next){
  console.log(req);
  res.header("Access-Control-Allow-Origin","*");
  next();
});

routes(apiRoutes);

app.use('/api', apiRoutes);

app.listen(port);

console.log('Ghosts In Artem server started on ' + port);
