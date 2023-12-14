    const mongoose = require('mongoose')

    const EmployeesSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        phone: String,
        cnic: String, 
        link: String,
        role: String
    })

    const EmployeeModel = mongoose.model("employee", EmployeesSchema)
    module.exports = EmployeeModel