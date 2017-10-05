'user strict';
var mongoose = require('mongoose'), User = mongoose.model('Users');

exports.list_users = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.read_user = function(req.res) {
    User.findById(req.params.userId, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}
