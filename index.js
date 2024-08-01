const express = require("express");
const { default: inquirer } = require("inquirer");
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require("pg");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: "postgres",
    // TODO: Enter PostgreSQL password
    password: "P@nther1$",
    host: "localhost",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the books_db database.`)
);

pool.connect();

function startTasks() {
inquirer
  .prompt([
    {
      type: "Choice",
      Messsge: "What would you like to work on?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All EMPLOYEES",
        "Add A DEPARTMENT",
        "ADD A ROLE",
        "ADD AN EMPLOYEE",
        "UPDATE AN EMPLOYEE ROLE",
      ],
    }
  ])
  .then((output) => {
    // Destructure the user input from the output object
       console.log(output)});
  }
  

    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
pool.query(`SELECT department.department_name department.id FROM department`, 
    //     (err, {rows}) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(rows);
    //   }
    );

startTasks()