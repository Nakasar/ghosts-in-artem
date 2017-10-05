'user strict';
module.exports = function(app) {
    var gia = require('../controllers/giaController');
};

// Ghosts In Artem routes
app.route('/users')
.get(gia.list_users)
.post(gia.create_user);

app.route('/users/:userId')
.get(gia.read_user)
.put(gia.create_user)
.delete(gia.delete_user);
