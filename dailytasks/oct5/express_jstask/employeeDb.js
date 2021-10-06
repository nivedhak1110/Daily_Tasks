/*
Rest API
GET POST PUT DELETE
Get with params, query params
*/

/*
Rest API
GET POST PUT DELETE
Get with params, query params
*/

var express = require("express");
var app = express();
app.use(express.json()); //  to parse request json (req.body)

/*
// sample employees object
var emp_list =
    [
        {
            firstName: "Nivedha",
            lastName: "Kuppuraj",
            age: 21,
            type: "permanent",
            empId: 100
        },
        {
            firstName: "Santhiya",
            lastName: "Dhandapani",
            age: 28,
            type: "contract",
            empId: 101
        }
    ];
*/



// GET api to retrieve all employee details
// http://localhost:3000/employees
app.get("/employees", function (req, res) {
    res.json(emp_list);
});

//POST api to add new employee details
// http://localhost:3000/employees
app.post('/employees', function (req, res) {
    emp_list.push(req.body) // push method to insert the object at the end
    res.send('New employee added')
});

//PUT api to update employee details
// http://localhost:3000/employees
app.put('/employees', function (req, res) {
    let isEmp = false;
    let name = req.body.firstName + ' ' + req.body.lastName;
    for (let i = 0; i < emp_list.length; i++) {
        if (emp_list[i].empId == req.body.empId) {
            emp_list[i].firstName = req.body.firstName;
            emp_list[i].lastName = req.body.lastName;
            emp_list[i].type = req.body.type;
            emp_list[i].age = req.body.age;
            isEmp = true;
            break;
        }
    }
    if (isEmp) {
        res.json('Employee :' + name + ' details updated successully ')
    } else {
        res.send('No employee exists with employee id ' + req.body.empId);
    }
});

// Delete api to delete employee details
// http://localhost:3000/employees/empid/102
app.delete('/employees/empid/:empid', function (req, res) {
    let isDeleted = false;
    for (let i = 0; i < emp_list.length; i++) {
        if (emp_list[i].empId == req.params.empid) {
            emp_list.splice(i, 1) // to delete specific index from the object
            isDeleted = true;
        }
    }
    if (isDeleted) {
        res.send('employee id ' + req.params.empid + ' details  are deleted')
    } else {
        res.send('employee id ' + req.params.empid + ' details not found in the database');
    }

});

// route parameters 
// http://localhost:3000/employees/empid/100
app.get("/employees/empid/:empid", function (req, res) {

    let isValid = false;
    for (let i = 0; i < emp_list.length; i++) {
        if (emp_list[i].empId == req.params.empid) {
            isValid = true;
            break;
        }
    }
    if (isValid) {
        res.json('employee id : ' + req.params.empid + ' is valid');
    } else {
        res.json('employee id : ' + req.params.empid + ' is invalid');
    }
});

// query parameters
// http://localhost:3000/employee?emptype=permanent&empid=100
// Find employee name with emp type & emp id
app.get("/employee", function (req, res) {
    console.log(req.query.empid + ' ' + req.query.emptype)

    let isEmp = false;
    let name = '';
    for (let i = 0; i < emp_list.length; i++) {
        if (emp_list[i].empId == req.query.empid && emp_list[i].type == req.query.emptype) {
            isEmp = true;
            name = emp_list[i].firstName + ' ' + emp_list[i].lastName;
            break;
        }
    }
    if (isEmp) {
        res.send('employee name is: ' + name);
    } else {
        res.send('No employee exists with employee id ' + req.query.empid + ' & type ' + req.query.emptype);
    }
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
});