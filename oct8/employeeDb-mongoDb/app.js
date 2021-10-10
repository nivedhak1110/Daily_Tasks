//employee rest api connected to mongodb--ODM mongoose

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const uri = "mongodb+srv://nivedha:nivedha@cluster0.rv4ny.mongodb.net/Employee?retryWrites=true&w=majority"
const EmployeeDetail = require('./models/employeeModel.js');
const { request } = require('http');
app.use(express.json());

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

//GET api to retrive all employee details from database
// http://localhost:3000/all-employees
app.get("/all-employees", async (req, res) => {
  try {
    const employees = await EmployeeDetail.find({})
    res.send(employees)
  }
  catch (err) {
    console.log(err)
  }
});

//GET api to retrive employee details from database using filter
// http://localhost:3000/employees 
app.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeDetail.find({ type: "permanent" }) //filter
    res.send(employees)
  }
  catch (err) {
    console.log(err)
  }
});

//POST api to save employee details into database
// http://localhost:3000/add-employee
app.post('/add-employee', (req, res) => {
  try {
    const employee = new EmployeeDetail({
      empId: req.body.empId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      type: req.body.type

    })
    employee.save();
    res.send(employee)
  }
  catch (err) {
    console.log(err)
  }
});

//PUT api to update employee details
// http://localhost:3000/employee/4
app.put('/employee/:empId', async (req, res) => {
  try {
    const employee = await EmployeeDetail.findOneAndUpdate({ empId: req.params.empId }, req.body)
    res.send(employee)
  }
  catch (err) {
    console.log(err)
  }
});

// Delete api to delete employee details
// http://localhost:3000/employee/4
app.delete('/employee/:empId', async (req, res) => {
  try {
    const employee = await EmployeeDetail.deleteOne({ empId: req.params.empId })
    res.send(employee)
  }
  catch (err) {
    console.log(err)
  }
});

// route parameters 
// http://localhost:3000/employee/4
app.get("/employee/:empId", async (req, res) => {
  try {
    const employee = await EmployeeDetail.find({ empId: req.params.empId }) //filter
    res.send(employee)
  }
  catch (err) {
    console.log(err)
  }
});

// query parameters
//http://localhost:3000/employee?empId=4&type=permanent
// Find employee details with emp id,type
app.get("/employee", async (req, res) => {
  try {
    const employee = await EmployeeDetail.find({ empId: req.query.empId, type: req.query.type }) //filter
    res.send(employee)
  }
  catch (err) {
    console.log(err)
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});




/*
other ways

//GET method to retrive employee details from database
// http://localhost:3000/employees
app.get("/employees", function (req, res) {
  EmployeeDetail.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//PUT api to update employee details
// http://localhost:3000/employee/1
app.put('/students/:id',function(req,res,next){
    EmployeeDetail.findOneAndUpdate({empId: req.params.id},req.body).then(function(employee){
        EmployeeDetail.findOne({empId: req.params.id}).then(function(employee){
            res.send(employee);
        });
    });
});
*/