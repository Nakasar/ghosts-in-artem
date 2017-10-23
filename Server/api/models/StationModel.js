'use strict'
//Schéma pour station
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StationSchema = new Schema({
  id : {
    type : String,
    required : 'A station should have an id'
  },
  ip_address : {
    type : String,
    required : ' A station should have an IP address'
  },
  actions_list : [{
    type: {
        type: String,
        enum : ['salute', 'popGhost','sendingMessage']
    }
  }]
});

module.exports = mongoose.model('Stations', StationSchema);
