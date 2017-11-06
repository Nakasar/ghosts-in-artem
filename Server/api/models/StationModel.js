'use strict'
//Schéma pour station
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StationSchema = new Schema({
  name : {
    type : String,
    required : 'A station should have a name.'
  },
  ip_address : {
    type : String,
    required : ' A station should have an IP address'
  },
  mac_address: {
    type: String,
    required: 'A station should have a mac address'
  },
  actions_list : {
    type: [String]
  }
});

module.exports = mongoose.model('Stations', StationSchema);
