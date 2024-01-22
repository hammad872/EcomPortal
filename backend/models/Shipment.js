const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  client:{
      type: String,
      required:false,
   },
  clientName:{
      type: String,
      required:true,
   },
  parcel: {
    type: String,
  },
  productName: [
    {
      type: mongoose.Schema.Types.Array,
      ref: 'Product',  // Make sure this matches the model name for shipments
    },
  ],
  receiverName: {
    type: String,
  },
  orderID: {
    type: String,
  },
  city: {
    type: String,
  },
  customerEmail: {      
    type: String,
  },
  customerAddress: {
    type: String,
  },
  contactNumber: {
    type: String ,
  },
  codAmount: {
    type: Number,
  },
 
}, { timestamps: true });

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;