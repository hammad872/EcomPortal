const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  reference: String,
  receiverName: String,
  city: String,
  customerEmail: String,
  customerAddress: String,
  contactNumber: String,
  codAmount: Number,
});

const Shipment = mongoose.model('shipment', shipmentSchema);

module.exports = Shipment;
