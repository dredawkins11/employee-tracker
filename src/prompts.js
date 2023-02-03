const query = require("./query.js");

// Exports an object that contains helper functions for generating prompts to be used with inquirer
module.exports = {
    startMenu() {
        return [
            {
                name: "startMenuChoice",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Quit",
                ],
                loop: false,
            },
        ];
    },
    addDepartment() {
        return [
            {
                name: "departmentName",
                message: "What is the name of this department?",
            },
        ];
    },
    // The next three helper functions utilize other helper functions to generate 'list' prompts, using data from the DB
    async addRole() {
        return [
            {
                name: "roleTitle",
                message: "What is the title of this role?",
            },
            {
                name: "roleSalary",
                message: "What is the salary of this role?",
            },
            {
                name: "roleDepartment",
                message: "Which department does this role belong to?",
                type: "list",
                loop: false,
                choices: await departmentChoices(),
            },
        ];
    },
    async addEmployee() {
        return [
            {
                name: "employeeFirstName",
                message: "What is this employee's first name?",
            },
            {
                name: "employeeLastName",
                message: "What is this employee's last name?",
            },
            {
                name: "employeeRole",
                message: "What is the role of this employee?",
                type: "list",
                loop: false,
                choices: await roleChoices(),
            },
            {
                name: "employeeManager",
                message: "Who is the manager of this employee?",
                type: "list",
                loop: false,
                choices: await employeeChoices(),
            },
        ];
    },
    async updateEmployee() {
        return [
            {
                name: "employeeId",
                message: "Which employee would you like to change?",
                type: "list",
                loop: false,
                choices: await employeeChoices()
            },
            {
                name: "employeeFirstName",
                message: "What is this employee's first name?",
            },
            {
                name: "employeeLastName",
                message: "What is this employee's last name?",
            },
            {
                name: "employeeRole",
                message: "What is the role of this employee?",
                type: "list",
                loop: false,
                choices: await roleChoices(),
            },
            {
                name: "employeeManager",
                message: "Who is the manager of this employee?",
                type: "list",
                loop: false,
                choices: await employeeChoices(),
            },
        ];
    },
};

// Generates choices from available employees
async function employeeChoices() {
    const results = await query.viewEmployees();
    const choices = results.map((employee) => {
        return `${employee.id} ${employee.first_name} ${employee.last_name}`;
    });
    
    return [...choices, "None"];
}

// Generates choices from available roles
async function roleChoices() {
    const results = await query.viewRoles();
    const choices = results.map((role) => {
        return `${role.id} ${role.title}`;
    });
    return choices;
}

// Generates choices from available departments
async function departmentChoices() {
    const results = await query.viewDepartments();
    const choices = results.map((deparment) => {
        return `${deparment.id} ${deparment.name}`;
    });
    return choices;
}
