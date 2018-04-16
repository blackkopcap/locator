'use strict';
let db = rootRequire('config/db');
let Passenger = db.define('order_passengers', {
    id: {
        type: db._Sequelize.INTEGER,
        primaryKey: true
    },
    order_id: {
        type: db._Sequelize.INTEGER,
    },
    name_first: {
        type: db._Sequelize.STRING,
    },
    name_second: {
        type: db._Sequelize.STRING
    },
    date_insert: {
        type: db._Sequelize.DATE
    }
});

module.exports = Passenger;
