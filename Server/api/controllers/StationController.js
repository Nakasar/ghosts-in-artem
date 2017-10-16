'use strict'
var mongoose = require('mongoose'), Station = mongoose.model('Stations');

exports.list_stations = function(req, res) {
    Station.find({}, function(err, stations) {
        if (err) {
            res.send(err);
        }else {
            res.json(stations);
        };
    });
};

exports.create_station = function(req, res) {
    var new_station = new Station(req.body);
    new_station.save(function(err, station) {
        if (err) {
            res.send(err);
        } else {
            res.json(station);
        }
    });
};

exports.read_station = function(req, res) {
    Station.findById(req.params.stationId, function(err, station) {
        if (err) {
            res.send(err);
        } else {
            res.json(station);
        }
    });
};

exports.delete_station = function(req, res) {
    Station.remove({
        _id: req.params.stationId
    }, function(err, station) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Station successfully deleted' })
        }
    });
};
