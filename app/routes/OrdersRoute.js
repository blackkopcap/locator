'use strict';

let express    = require('express');
let Controller = rootRequire('app/controllers/OrdersController');
let router     = express.Router();

router.get('/', Controller.index.get);

module.exports = router;
