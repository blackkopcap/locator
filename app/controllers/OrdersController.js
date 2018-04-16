'use strict';
let Order = rootRequire('app/models/Order');
let Passenger = rootRequire('app/models/Passenger');
let moment = require("moment");
let Sbs = rootRequire('app/utils/SbsCurrency.js');

module.exports = {
  index: {
    async get(req, res) {
      try {
        var orders = await Order.findAll();
        var currencies = await Sbs.getCurrencyTable();

        if (Object.keys(currencies).length) {

          var orders_list = [];
          for (let id in orders) {
            let passengers = await Passenger.count({
              where: {
                order_id: orders[id].id
              }
            });

            let amount_in_rubles = (typeof currencies[orders[id].currency] != "undefined") ? Math.floor(orders[id].price * currencies[orders[id].currency].value / currencies[orders[id].currency].nominal) * passengers + " руб." : orders[id].price * passengers + " руб.";

            orders_list.push(
              [
                orders[id].id, `<a href="/order/${orders[id].locator}">${orders[id].locator}</a>`,
                moment().format("YYYY-MM-DD HH:mm:ss"),
                amount_in_rubles,
                `${orders[id].price * passengers} ${orders[id].currency}`,
                passengers
              ])
          }

          return res.render('orders/index', {
            orders: orders_list
          });
        }
        else {
          return res.render('orders/index', {
            orders: []
          });
        }
      }
      catch (err) {
        return res.render('orders/index', {
          orders: []
        });
      }
    }
  }
};
