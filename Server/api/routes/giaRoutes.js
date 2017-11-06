'use strict';
module.exports = function(app) {
    var user = require('../controllers/UserController');
    var station = require('../controllers/StationController')

    // Ghosts In Artem routes
    app.route('/users')
    .get(user.list_users)
    .post(user.create_user);

    app.route('/users/phones')
    .get(user.list_phones);

    app.route('/users/:userId')
    .get(user.read_user)
    .put(user.update_user)
    .delete(user.delete_user);


    app.route('/users/:userId/connects')
    .get(user.user_connect_get)
    .post(user.user_connect_add)
    .delete(user.user_connect_whipe);

    app.route('/stations')
    .get(station.list_stations)
    .post(station.create_station);

   app.route('/stations/:stationId')
   .get(station.read_station)
   .put(station.create_station)
   .delete(station.delete_station);
};
