const express = require('express')
const app = express()

const bluetooth = require('node-bluetooth');


app.get('/', function (req, res) {
	// create bluetooth device instance 
	const device = new bluetooth.DeviceINQ();
device.on('finished',  console.log.bind(console, 'finished'))
datas = '{';
device.on('found', function found(address, name){
console.log('Found: ' + address + ' with name ' + name);
res.write('Found: ' + address + ' with name ' + name + '\n','utf-8');
datas = datas + '"' + name + '":"' + address + '",';
}).inquire();
res.end()
datas = datas.substr(0,datas.length-1) + '}';
console.log(datas);
var obj = JSON.parse(datas); 
console.log(obj);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
