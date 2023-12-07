const mongoose = require('mongoose')

const EmployeesSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cnic: String, 
    link: String, 
})

const EmployeeModel = mongoose.model("employee", EmployeesSchema)
module.exports = EmployeeModel