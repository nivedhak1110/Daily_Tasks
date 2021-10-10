import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Employees } from "./entity/Employees";

// create typeorm connection
createConnection().then(connection => {
    const employeesRepository = connection.getRepository(Employees);

    // create and setup express app
    const app = express();
    app.use(express.json());

    // register routes
    // GET api to retrieve all employees details
    // http://localhost:3000/employees
    app.get("/employees", async function (req: Request, res: Response) {
        const employees = await employeesRepository.find();
        res.json(employees);
    });

    
    //POST api to add new employee details
    // http://localhost:3000/employees
    app.post("/employees", async function(req: Request, res: Response) {
        const newEmployee = await employeesRepository.create(req.body);
        const results = await employeesRepository.save(newEmployee);
        return res.send(results);
    });
    

    //PUT api to update employee details
    // http://localhost:3000/employees    
    app.put("/employees/", async function(req: Request, res: Response) {
        const empId = req.body.empId;
        const employee = await employeesRepository.findOne(empId);
        employeesRepository.merge(employee, req.body);
        const results = await employeesRepository.save(employee);
        return res.send(results);
    });

    // Delete api to delete employee details
    // http://localhost:3000/employee/2
    app.delete("/employee/:id", async function(req: Request, res: Response) {
        const results = await employeesRepository.delete(req.params.id);
        return res.send(results);
    });

    // route parameters 
    // http://localhost:3000/employee/1

    app.get("/employee/:id", async function(req: Request, res: Response) {
        const results = await employeesRepository.findOne(req.params.id);
        return res.send(results);
    });

    
    // Find employee name with emp type & emp id
    app.listen(3000, function () {
        console.log("Server running on port 3000");
    });
});