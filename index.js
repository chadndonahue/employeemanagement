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