'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'user should have a name'
    },
    created_date: {
        type: String,
        default: Date.now
    },
    phone_id: {
        type: String,
        required: 'A user should have a phone id'
    },
    score: {
        type: String,
        default: '0'
    },
    role: {
        type: [{
            type: String,
            enum: ['master', 'ghosts', 'depinfo', 'others']
        }],
        default: ['others']
    },
    class: {
        type: [{
            type: String,
            enum: ['peon']
        }],
        default: ['peon']
    }
});

module.exports = mongoose.model('Users', UserSchema);
