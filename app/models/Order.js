'use strict';
let db = rootRequire('config/db');
let Order = db.define('order', {
    id: {
        type: db._Sequelize.INTEGER,
        primaryKey: true
    },
    locator: {
        type: db._Sequelize.STRING,
    },
    email: {
        type: db._Sequelize.STRING,
    },
    phone: {
        type: db._Sequelize.STRING
    },
    price: {
        type: db._Sequelize.DECIMAL
    },
    currency: {
        type: db._Sequelize.STRING
    },
    date_insert: {
        type: db._Sequelize.DATE
    }
});

module.exports = Order;
