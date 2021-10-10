const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empId: {
        type: Number,
        required: true,
        unique: true

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true

    }
});
const Employee =new mongoose.model('EmployeeDetail',employeeSchema);
module.exports = Employee;