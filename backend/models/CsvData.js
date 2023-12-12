const mongoose = require('mongoose');

// Define the schema for CSV data
const csvDataSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Subtotal: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

// Create a model for CSV data using the schema
const CsvData = mongoose.model('CsvData', csvDataSchema);

module.exports = CsvData;
