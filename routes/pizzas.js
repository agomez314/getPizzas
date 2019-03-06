const express = require('express');
const Pizzas = require('../models/Pizzas')
const router = express.Router();

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
  const body = req.body;
  if (!body.toppings || !body.cheese || !body.type || !body.size) {
    res.send('Missing fields. Please input an order that contains an array of toppings, a type of cheese, a type of pizza and a pizza size.')
  }

  const pizza = new Pizzas({
    toppings: body.toppings,
    cheese: body.cheese,
    type: body.type,
    size: body.size
  });

  pizza.save((err, doc) => {
    if (err) throw new Error(err)
    res.status(201).json({
      'New pizza added': doc
    })
  })
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send({
      'error': 'could not find an order with that id'
    })
  }
  Pizzas.findByIdAndDelete(id, (err, order) => {
    if (order === null) {
      res.send('Could not find an order with that id')
    }
    if (err) throw new Error(err)
    res.send({
      'Deleted pizza with id ': order
    })
  })
})

module.exports = router;