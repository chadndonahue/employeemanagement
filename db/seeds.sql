INSERT INTO department (name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Sales"),
       ("Engineering"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 50000, 1),
       ("Sales Lead", 70000, 3),
       ("HR", 60000, 2),
       ("Manager", 100000, 5),
       ("Engineer", 90000, 4),
       ("Salesman", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mario", "Diaz", 4),    
       ("Miguel", "Davila", 2),
       ("Jamie", "Chu", 6),
       ("Chad", "Donahue", 1);

UPDATE employee SET manager_id = 2
WHERE id = 1 or id = 3 or id = 4;