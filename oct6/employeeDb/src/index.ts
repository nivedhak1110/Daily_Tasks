import "reflect-metadata";
import {createConnection} from "typeorm";
import {Employees} from "./entity/Employees";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const employee = new Employees();
    employee.firstName = "Nivedha";
    employee.lastName = "K";
    employee.age = 25;
    employee.type="permanent";
    await connection.manager.save(employee);
    console.log("Saved a new user with id: " + employee.empId);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Employees);

}).catch(error => console.log(error));
