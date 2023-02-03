USE employee_db;

INSERT INTO department (name)
VALUES  ("GM"),
        ("Front End"),
        ("Fulfillment"),
        ("Grocery");

INSERT INTO role (title, salary, department_id)
VALUES  ("GM Gigachad", 15.00, 1),
        ("GM Team Lead", 20.00, 1),
        ("OPU Person", 15.00, 3),
        ("Fulfillment Team Lead", 20.00, 3),
        ("Cashier", 15.00, 2),
        ("Front End Leader", 20.00, 2),
        ("Produce Goober", 15.00, 4),
        ("Grocery Overlord", 20.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mario", "Brother", 2, null),
        ("Dre", "Dawkins", 1, 1),
        ("Eric", "Andre", 3, null),
        ("Sejin", "Kim", 3, 4),
        ("Allie", "Awesome", 2, null),
        ("Jack", "Jill", 2, 6),
        ("Jay", "Black", 8, null),
        ("Doug", "Dude", 7, 7);