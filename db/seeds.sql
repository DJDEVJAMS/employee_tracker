-- Insert initial data into the department table
INSERT INTO department (id, department_name) VALUES 
(1,'Engineering'),
(2,'Data Science'),
(3,'Management'),
(4,'Human Resources');

-- Insert initial data into the role table
INSERT INTO role_tb (title, salary, department) VALUES 
('Software Engineer', 80000.00, 1),
('Data Scientist', 90000.00, 2),
('Project Manager', 85000.00, 3),
('HR Specialist', 60000.00, 4);

-- Insert initial data into the employee table
INSERT INTO employee_tb (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Jim', 'Beam', 3, 1),
('Jake', 'Daniels', 4, NULL),
('Jill', 'Valentine', 1, 1),
('Sam', 'Fisher', 2, 3);