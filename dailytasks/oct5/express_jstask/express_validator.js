const express = require("express");
const app = express();
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2');

app.use(express.json()); //  to parse request json (req.body)

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "subscribers"
});


//establish connection
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


//select query
con.connect(function (err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


//post api to validate,santize and insert request body into database
app.post('/details',
  // email validation
  body('email').isEmail().normalizeEmail(),
  // phone number validation
  body('phone').isLength({ min: 10 }),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        console.log(req.body)
        // insert into table
        con.connect(function (err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "INSERT INTO users SET ?"
          var post = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
          }
          con.query(sql, post, function (err, res) {
            if (err) throw "user exists";
            console.log("success");
            //console.log(res);
          });
        });
        res.send('received details')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
);


//listen to port
app.listen(3000, function () {
  console.log("Server running on port 3000");
});

/*
//create database
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE subscribers", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

//create table
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (name VARCHAR(255), email VARCHAR(255) NOT NULL PRIMARY KEY, phone VARCHAR(20)NOT NULL,age INT(10))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });



//drop table
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "Drop TABLE users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("drop created");
  });
});
*/
