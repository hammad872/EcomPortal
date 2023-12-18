const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
  },
  codAmount: {
    type: Number,
    required: true,
  },
  objectIdUser: {
    type: Number,
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "employee",
    },
  ],
},
{timestamps:true}
);

const Shipment = mongoose.model('shipment', shipmentSchema);

module.exports = Shipment;
