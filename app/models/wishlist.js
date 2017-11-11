var mongoose = require('mongoose');

module.exports = mongoose.model('Wishlist',{
      user_id: String,
      product_id: String
});
