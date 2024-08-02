const express = require("express");
const inquirer = require("inquirer"); // Use the default import without destructuring
// Import and require Pool (node-postgres)
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
  console.log(`Connected to the employee_tracker_db database.`);
  release(); // Release the client after connection
});

function exit() {
  inquirer
  .prompt([
    {
      type: "list",
      name: "end",
      choice: ["exit"],
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
        type: "list", // Corrected the type
        name: "task", // Added a name for the prompt
        message: "What would you like to work on?", // Corrected the message
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
      // Destructure the user input from the output object
      console.log(data);
      switch (data.task.toUpperCase()) {
        case "VIEW ALL DEPARTMENTS":
          pool.query(
            "SELECT department_name, id FROM department",
            (err, res) => {
              if (err) {
                console.err(err);
                return;
              }
              console.table(res.rows);
              startTasks();
            }
          );
          break;
        default:
          startTasks();  // Call startTasks if no case matches
          break;
      
        case "VIEW ALL ROLES":
          pool.query(
            "SELECT * FROM role_tb",
                (err, res) => {
                if (err) {
                  console.err(err);
                  return;
                }
                console.table(res.rows);
                startTasks();
              }
            );
            break;
          default:
            startTasks();  // Call startTasks if no case matches
            break;
        
        case "VIEW ALL EMPLOYEES":
          pool.query(
            "SELECT * FROM employee_tb",
            (err, res) => {
                if (err) {
                  console.err(err);
                  return;
                }
                console.table(res.rows);
                startTasks();
              }
            );
            break;
          default:
            startTasks();  // Call startTasks if no case matches
            break;
        
        case "ADD A DEPARTMENT":
          console.log("ADD A DEPARTMENT");
          break;
        case "ADD A ROLE":
          console.log("ADD A ROLE");
          break;
        case "ADD AN EMPLOYEE":
          console.log("ADD AN EMPLOYEE");
          break;
        case "UPDATE AN EMPLOYEE ROLE":
          console.log("UPDATE AN EMPLOYEE ROLE");
          break;
        case "EXIT":
          console.log("EXIT");
          break;
              }
    });
}

// Starting the tasks
startTasks();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
