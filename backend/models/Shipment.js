const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  parcel: {
    type: String,
    required: true,
  },

  reference: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  customerEmail: {      
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String ,
    required: true,
  },
  codAmount: {
    type: Number,
    required: true,
  },
  client: [
     {
      type:  mongoose.Schema.Types.ObjectId, 
      required: true,
    },
  ],
}, { timestamps: true });

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
