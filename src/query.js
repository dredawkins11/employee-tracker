require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: process.env.HOST_NAME,
        database: process.env.DB_NAME,
        user: process.env.USER,
        password: process.env.PASSWORD,
    },
    console.log("Connected to db...")
);

// Create an object to be exported that contains all the helper functions for making DB queries
// The functions will return a promise that resolves with the results of the DB query
module.exports = {
    viewDepartments() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM department", function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    viewRoles() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM role", function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    viewEmployees() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM employee", function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    addDepartment(departmentName) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO department (name) VALUES (?)`,
                departmentName,
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    },

    addRole(roleTitle, roleSalary, roleDepartmentId) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [roleTitle, roleSalary, roleDepartmentId],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    },

    addEmployee(
        employeeFirstName,
        employeeLastName,
        employeeRoleId,
        employeeManagerId
    ) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [
                    employeeFirstName,
                    employeeLastName,
                    employeeRoleId,
                    employeeManagerId,
                ],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    },

    updateEmployee(
        employeeId,
        employeeFirstName,
        employeeLastName,
        employeeRoleId,
        employeeManagerId
    ) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE id=?`,
                [
                    employeeFirstName,
                    employeeLastName,
                    employeeRoleId,
                    employeeManagerId,
                    employeeId,
                ],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    },
};
