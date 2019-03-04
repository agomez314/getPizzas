const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PizzaSchema = new mongoose.Schema({
    toppings: Array,
    cheese: String,
    type: String,
    size: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Pizzas = mongoose.model('Pizzas', PizzaSchema);

module.exports = Pizzas;