const express = require('express');
const Pizzas = require('../models/Pizzas')

const router = express.Router();

router.get('/', (req, res) => {
    Pizzas.find({}, (err, docs) => {
            if (err) throw err;
            res.status(200).json(docs)
        })
        .limit(res.locals.limit)
})

module.exports = router