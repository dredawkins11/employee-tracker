require("console.table");
const inquirer = require("inquirer");
const query = require("./src/query");
const prompts = require("./src/prompts");

async function init() {
    // Variable for keeping the loop running
    let loopActive = true;

    // Logic for cleaning up console (separators, new lines, color)
    const separator = new Array(70).join("_");
    console.log("\x1b[1;32m", `${separator}\n`);

    // All prompt logic is placed in this while loop
    while (loopActive) {
        // Initial menu that is called every loop to allow user to choose next action
        const { startMenuChoice } = await inquirer.prompt(prompts.startMenu());

        // Dynamic results variable that is logged with console.table, at the end of the switch statement
        let results;
        switch (startMenuChoice) {
            // The 'view' menu options simply utilize the query helper functions and set the 'results' variable to their output
            case "View All Departments":
                try {
                    results = await query.viewDepartments();
                } catch (err) {
                    console.log(err);
                }
                break;

            case "View All Roles":
                try {
                    results = await query.viewRoles();
                } catch (err) {
                    console.log(err);
                }
                break;

            case "View All Employees":
                try {
                    results = await query.viewEmployees();
                } catch (err) {
                    console.log(err);
                }
                break;
            
            // The 'add' menu options utilize the prompt and query helper functions to, first, dynamically generate a prompt
            // with data reflective of the DB, and then, add the user choices to the DB
            case "Add Department":
                try {
                    const addDeparmentPrompts = prompts.addDepartment();
                    const addDepartmentAnswers = await inquirer.prompt(
                        addDeparmentPrompts
                    );
                    await query.addDepartment(
                        addDepartmentAnswers.departmentName
                    );
                    results = "Department added!";
                } catch (err) {
                    console.log(err);
                }
                break;

            case "Add Role":
                try {
                    const addRolePrompts = await prompts.addRole();
                    const { roleTitle, roleSalary, roleDepartment } =
                        await inquirer.prompt(addRolePrompts);
                    await query.addRole(
                        roleTitle,
                        parseFloat(roleSalary),
                        parseInt(roleDepartment)
                    );
                    results = "Role added!";
                } catch (err) {
                    console.log(err);
                }
                break;

            case "Add Employee":
                try {
                    const addEmployeePrompts = await prompts.addEmployee();
                    let {
                        employeeFirstName,
                        employeeLastName,
                        employeeRole,
                        employeeManager,
                    } = await inquirer.prompt(addEmployeePrompts);
                    if (employeeManager === "None") {
                        employeeManager = null;
                    } else {
                        employeeManager = parseInt(employeeManager);
                    }
                    await query.addEmployee(
                        employeeFirstName,
                        employeeLastName,
                        parseInt(employeeRole),
                        employeeManager
                    );
                    results = "Employee added!";
                } catch (err) {
                    console.log(err);
                }
                break;
            
            // The 'update employee' menu choice is very similiar to the 'add employee' menu choice, apart from it's need to prompt
            // for the employee to be updated.
            case "Update Employee Role":
                try {
                    const addEmployeePrompts = await prompts.updateEmployee();
                    let {
                        employeeId,
                        employeeFirstName,
                        employeeLastName,
                        employeeRole,
                        employeeManager,
                    } = await inquirer.prompt(addEmployeePrompts);
                    if (employeeManager === "None") {
                        employeeManager = null;
                    } else {
                        employeeManager = parseInt(employeeManager);
                    }
                    await query.updateEmployee(
                        parseInt(employeeId),
                        employeeFirstName,
                        employeeLastName,
                        parseInt(employeeRole),
                        employeeManager
                    );
                    results = "Employee updated!";
                } catch (err) {
                    console.log(err);
                }
                break;

            case "Quit":
                results = "Bye :)";
                loopActive = false;
                break;
        }
        
        // Add formatting things and console.table the results to the console
        console.log(`\n`);
        console.table(results);
        console.log(`${separator}\n`);
    }
}

init();
