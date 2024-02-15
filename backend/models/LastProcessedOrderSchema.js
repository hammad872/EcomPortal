const mongoose = require('mongoose');

const LastProcessedOrderIdSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true
  }
});

const LastProcessedOrderId = mongoose.model('LastProcessedOrderId', LastProcessedOrderIdSchema);

module.exports = LastProcessedOrderId;