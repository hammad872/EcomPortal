const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  shipments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipment',  // Make sure this matches the model name for shipments
    },
  ],
});

const EmployeeModel = mongoose.model("employee", EmployeesSchema);
module.exports = EmployeeModel;
