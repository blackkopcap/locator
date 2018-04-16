'use strict';

let express    = require('express');
let Controller = rootRequire('app/controllers/OrderController');
let router     = express.Router();

router.get('/:id', Controller.index.get);
module.exports = router;