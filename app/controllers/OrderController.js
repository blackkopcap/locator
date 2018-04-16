'use strict';
let Order = rootRequire('app/models/Order');
let Passenger = rootRequire('app/models/Passenger');
let moment = require("moment");


module.exports = {
  index: {
    async get(req, res) {
      try {
        let id = req.params.id;
        if (!id)
          throw new Error("No locator");

        let order = await Order.findOne({
          where: {
            locator: id
          }
        });

        let PassengerOrder = await Passenger.findAll({
          where: {
            order_id: order.dataValues.id
          }
        })

        let PassengersList = [];
        PassengerOrder.forEach((passenger) => {
          PassengersList.push([order.dataValues.id, order.dataValues.locator, passenger.dataValues.name_first, passenger.dataValues.name_second]);
        })

        res.render('order/index', {
          order: PassengersList
        });

      }
      catch (err) {
        console.log(err);
        res.render('order/index', {
          order: []
        });
      }
    }
  }
};
