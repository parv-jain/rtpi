var mongoose = require('mongoose');

module.exports = mongoose.model('Wishlist',{
      userid: String,
      product_id: String
});
