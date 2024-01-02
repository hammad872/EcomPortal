const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   productTitle:{
      type: String,
      required:false,
   },
   sourcing:{
      type: Number,
      required:false,
   },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;