var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    food_name: String,
    price: Number
});