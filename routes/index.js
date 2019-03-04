const express = require('express');
const Pizzas = require('../models/Pizzas')
const router = express.Router();

router.get('/pizzas', (req, res) => {
  let limit = new Number(req.query.limit);
  if (!limit) {
    limit = 1;
  }
  if (limit > 100) {
    res.send('Requested too many records. You can request up to 100 pizza orders')
  }
  Pizzas.find({}, (err, docs) => {
      if (err) throw err;
      res.status(200).json(docs)
    })
    .limit(limit)
})

router.post('/pizzas', (req, res) => {
  const body = req.body;
  if (!body.toppings || !body.cheese || !body.type || !size) {
    res.send('Missing fields. Please input an order that contains an array of toppings, a type of cheese, a type of pizza and a pizza size.')
  }
  const pizza = new Pizzas({
    toppings: body.toppings,
    cheese: body.cheese,
    type: body.type,
    size: body.size
  });

  pizza.save(err => {
    if (err) throw new Error(err)
    res.status(201).send('New pizza added')
  })
})

router.post('/pizzas/:id', (req, res) => {
  const id = req.params.id;
  const updated_doc = req.params.body
  Pizzas.findOneAndUpdate({
    _id: id
  }, updated_doc, {
    new: true
  }, (err, order) => {
    if (err) throw new Error(err)
    res.send('Modified order: ', order)
  })
})

router.delete('/pizzas/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send('Please use a valid order id to delete')
  }
  Pizzas.findByIdAndDelete({
    _id: id
  }, (err, order) => {
    res.send('Deleted order with id ', order.id)
  })
})

module.exports = router;