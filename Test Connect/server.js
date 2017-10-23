var express = require('express'),
app = express(),
port = process.env.PORT || 3030,
bodyParser = require('body-parser')
http = require('http');

app.route('/:server_address/found/:bt_address').get(function(req, res) {
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
      res.json(JSON.parse(data));
    });
  }).on('error', (err) => {
    console.log("Error: " + err.message);
  });
});

app.listen(port);

console.log('Test server started on port: ' + port);
