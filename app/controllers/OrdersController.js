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

        var orders_list = [];
        for (let id in orders) {
          let passengers = await Passenger.findAndCountAll({
            where: {
              order_id: orders[id].id
            }
          });
          
          let amount_in_rubles = (typeof currencies[orders[id].currency] != "undefined") ? Math.floor(orders[id].price * currencies[orders[id].currency].value / currencies[orders[id].currency].nominal) * passengers.count + " руб." : orders[id].price * passengers.count + " руб.";

          orders_list.push(
            [
              orders[id].id, `<a href="/order/${orders[id].locator}">${orders[id].locator}</a>`, 
              moment().format("YYYY-MM-DD HH:mm:ss"), 
              amount_in_rubles, `${orders[id].price * passengers.count} ${orders[id].currency}`, 
              passengers.count
            ])
        }

        res.render('orders/index', {
          orders: orders_list
        });
      }
      catch (err) {
        res.render('orders/index', {
          orders: []
        });
      }
    }
  }
};
