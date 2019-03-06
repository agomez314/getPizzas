const express = require('express');
const router = express.Router();
const pizzasRouter = require('./pizzas')
const toppingsRouter = require('./toppings')


router.use('/pizzas', pizzasRouter);
router.use('/toppings', toppingsRouter);


module.exports = router;