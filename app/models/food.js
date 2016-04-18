var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    food_name: String,
    price: Number
});