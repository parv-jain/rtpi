var mongoose = require('mongoose');

module.exports = mongoose.model('Product',{
      title: String,
      current_price: String,
      mrp: String,
      current_time: String,
      price_history_file: String
});
