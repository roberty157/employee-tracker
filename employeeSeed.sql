DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(7,2),
    department_id INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    PRIMARY KEY (id),

    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO department(name)
VALUES ("toys");

INSERT INTO role (title, salary, department_id)
VALUES ("clerk", 15.25, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Robert", "Y", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "R", 1, 1);