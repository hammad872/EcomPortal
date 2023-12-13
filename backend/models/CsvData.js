const mongoose = require("mongoose");

// Define the schema for CSV data
const csvDataSchema = new mongoose.Schema({
  refrence: {
    type: String,
    required: true,
  },
  cutomerEmail: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

// Create a model for CSV data using the schema
const CsvData = mongoose.model("CsvData", csvDataSchema);

module.exports = CsvData;
