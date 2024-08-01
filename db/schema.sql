--crate new database
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role_tb (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department INTEGER NOT NULL,
    FOREIGN KEY (department) REFERENCES department(id) 
);   

CREATE TABLE employee_tb (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30), 
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role_tb(id),
    FOREIGN KEY (manager_id) REFERENCES employee_tb(id)
);
