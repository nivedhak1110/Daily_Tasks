/*
Rest API
GET POST PUT DELETE
Get with params, query params
*/

var express = require("express");
var app = express();
app.use(express.json()); //  to parse request json (req.body)

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
            firstName: "Karthi",
            lastName: "Dhandapani",
            age: 28,
            type: "contract",
            empId: 101
        }
    ];


// GET api to retrieve all employee details
app.get("/employees", function (req, res) {
    res.json(emp_list);
});

//POST api to add new employee details
app.post('/employees', function (req, res) {
    emp_list.push(req.body)
    res.send('New employee added')
});

//PUT api to update employee details
app.put('/employees', function (req, res) {
    res.send('employee details updated')
});

// Delete api to delete employee details
app.delete('/employees', function (req, res) {
    res.send('employee details deleted')
});

// route parameters 
// http://localhost:3000/employees/empid/100
app.get("/employees/empid/:empid", function (req, res) {
    res.json('employee id : ' + req.params.empid + ' is valid');
});

// query parameters ?emptype=permanent
//http://localhost:3000/employee/?emptype=permanent

app.get("/employee", function (req, res) {
    if (req.query.emptype === 'permanent') {
        // return all permanent employees 
        res.json('permanent employee details will be returned');

    } else if (req.query.emptype === 'contract') {
        // return all temp employees
        res.json('contract employee details will be returned');
    } else {
        res.json('Invalid emptype');
    }
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
});