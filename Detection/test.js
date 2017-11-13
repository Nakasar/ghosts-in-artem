const express = require('express')
const app = express()

const bluetooth = require('node-bluetooth');


app.get('/', function (req, res) {

  var noble = require('noble');
  /*
  noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
      noble.startScanning([], true);
    } else {
      noble.stopScanning();
    }
  });
  */

  setInterval(function () {
    noble.startScanning([], true);
    noble.on('discover', function (peripheral) {
      if (peripheral.uuid === "f739b666ede9") {
        console.log('Discovered Peripheral : ' + peripheral.uuid + ' RSSI:' + peripheral.rssi);
        /*
        peripheral.connect(function (error) {
          if (error == undefined) {
            console.log(peripheral.uuid + ' RSSI:' + peripheral.rssi);
          } else {
            console.log(peripheral.uuid + ' RSSI:' + peripheral.rssi + ' Connecting, Error : ' + error);
          }
        });/*
        peripheral.updateRssi(function (error, rssi) {
          console.log(peripheral.uuid + ' RSSI:' + peripheral.rssi + ' update RSSI + ' + rssi + ' : Error :' + error);
        });
  
        peripheral.on('connect', function () {
          console.log(peripheral.uuid + ' RSSI:' + peripheral.rssi + ' Has conected');
        });
        peripheral.on('rssiUpdate', function (rssi) {
          console.log(peripheral.uuid + ' RSSI updated : ' + rssi);
  
        });*/

      }
    });
  }, 2000)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
