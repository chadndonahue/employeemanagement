const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lassie110437a",
    database: "employee_db",
});

db.connect((err) => {
    if (err) throw err;
    startPrompt();
});

function viewDepartments() {
    db.query("select * from department", (err, data) => {
        printTable(data);
        startPrompt();
    });
}

function viewRoles() {
    db.query("select * from role", (err, data) => {
        printTable(data);
        startPrompt();
    });
}

function viewEmployees() {
    db.query("select * from employee", (err, data) => {
        printTable(data);
        startPrompt();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depName",
        message: "What is the department's name?",
      },
    ])
    .then((answer) => {
      db.query(
        "insert into department (name) values (?)",
        [answer.depName],
        (err, data) => {
          console.log("New department added");
          viewDepartments();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "roleSal",
        message: "What is the role's salary?",
      },
      {
        type: "input",
        name: "roleDepID",
        message: "What is the role's deparment ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "insert into role (title, salary, department_id) values (?, ?, ?)",
        [answer.roleTitle, answer.roleSal, answer.roleDepID],
        (err, data) => {
          console.log("New role added!");
          viewRoles();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleID",
        message: "What is the employee's role ID?",
      }
    ])
    .then((answer) => {
      db.query(
        "insert into employee (first_name, last_name, role_id) values (?, ?, ?)",
        [
          answer.firstName,
          answer.lastName,
          answer.roleID,
        ],
        (err, data) => {
          console.log("New employee added!");
          viewEmployees();
        }
      );
    });
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeID",
        message: "Which employee's id would you like to update?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the new role ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "update employee set role_id = ? where id = ?",
        [answer.roleId, answer.employeeID],
        (err, data) => {
          console.log("New role updated!");
          viewEmployees();
        }
      );
    });
}

function startPrompt() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
              "View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee role",
            ],
        }
    ])

    .then((answers) => {
        if (answers.menu === "View all departments") {
            viewDepartments();
        } else if (answers.menu === "View all roles") {
            viewRoles();
          } else if (answers.menu === "View all employees") {
            viewEmployees();
          } else if (answers.menu === "Add a department") {
            addDepartment();
          } else if (answers.menu === "Add a role") {
            addRole();
          } else if (answers.menu === "Add an employee") {
            addEmployee();
          } else {
            updateEmployee();
          }
    });
}