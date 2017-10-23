'use strict';
var mongoose = require('mongoose'), User = mongoose.model('Users');

exports.list_users = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.send(err);
        }else {
            res.json(users);
        };
    });
};

exports.list_phones = function(req, res) {
    User.find({},"bt_mac _id", function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        };
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

exports.read_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete_user = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'User successfully deleted' })
        }
    });
};

exports.user_connect_get = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user.connects);
        }
    })
};

exports.user_connect_add = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            user.connects.push({ station_id: req.body.station_id, date: Date.now() });
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.send( { success : 'Connection taken into account' });
            });
        }
    })
};

exports.user_connect_whipe = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            user.connects = [];
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.send( { success : 'User connections whiped.' });
            });
        }
    })
};

//Pour la station
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
