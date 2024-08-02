const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool({
  user: "postgres",
  password: "P@nther1$",
  host: "localhost",
  database: "employee_tracker_db",
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to the employee_tracker_db database.");
  release();
});

function addDepartment() {
  inquirer
  .prompt([
    {
      type:"input",
      name:"addDept",
      message:"Enter the new department name.",

      type:"input",
      name:"idDepot",
      message:"Enter the new department name.",

    }
  ])
  .then((newDepot) => { 
console.log(newDepot.addDept);
const query = `INSERT INTO department VALUES ("${newDepot.idDepot}","${newDepot.addDept}")` 
;

  })

}

function addRole() {
  nquirer
  .prompt([
    {
      type:"input",
      name:"addDept",
      message:"Enter the new department name.",

      type:"input",
      name:"idDepot",
      message:"Enter the new department name.",

    }
  ])
  .then((newRole) => 
};

function exit() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "end",
        choices: ["exit"], // Corrected from choice to choices
      },
    ])
    .then((data) => {
      if (data.end === "exit") {
        console.log("Goodbye!");
        process.exit();
      }
    });
}

function startTasks() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to work on?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then((data) => {
      switch (data.task.toUpperCase()) {
        case "VIEW ALL DEPARTMENTS":
          pool.query(
            "SELECT department_name, id FROM department",
            (err, res) => {
              if (err) {
                console.error(err); // Corrected from console.err to console.error
                return;
              }
              console.table(res.rows);
              startTasks();
            }
          );
          break;
        case "VIEW ALL ROLES":
          pool.query(
            "SELECT * FROM role_tb",
            (err, res) => {
              if (err) {
                console.error(err); // Corrected from console.err to console.error
                return;
              }
              console.table(res.rows);
              startTasks();
            }
          );
          break;
        case "VIEW ALL EMPLOYEES":
          pool.query(
            "SELECT * FROM employee_tb",
            (err, res) => {
              if (err) {
                console.error(err); // Corrected from console.err to console.error
                return;
              }
              console.table(res.rows);
              startTasks();
            }
          );
          break;



    
        case "ADD A DEPARTMENT":
          console.log("ADD A DEPARTMENT");
         addDepartment();
          break;
 
        case "ADD A ROLE":
          console.log("ADD A ROLE");
          addRole();
          break;
        case "ADD AN EMPLOYEE":
          console.log("ADD AN EMPLOYEE");
          addEmployee();
          break;
        case "UPDATE AN EMPLOYEE ROLE":
          console.log("UPDATE AN EMPLOYEE ROLE");
          updateEmpoyeeRole();
          break;
        case "EXIT":
          exit();
          break;
        default:
          startTasks();  // Call startTasks for any other cases
          break;
      }
    });
}



// Start the tasks
startTasks();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
