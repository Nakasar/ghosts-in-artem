'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'user should have a name'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    bt_mac: {
        type: String,
        required: 'A user should have a mac address'
    },
    score: {
        type: String,
        default: '0'
    },
    role: {
      type: String,
      enum: ['mentor', 'master', 'ghosts', 'depinfo', 'others']
      default: 'others',
    },
    class: {
        type: String,
        enum: ['vampire', 'peon'],
        default: 'peon'
    },
    connects: [{
        date: Date,
        station_id: String
    }]
});


module.exports = mongoose.model('Users', UserSchema);
