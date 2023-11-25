// Create employee
app.post("/employee", (req, res) => {
    let employee = req.body;
    var sql = "INSERT INTO employees SET ?";
    db.query(sql, employee, (err, result) => {
        if (err) throw err;
        res.send("Employee added...");
    });
});

// Get all employees
app.get("/employees", (req, res) => {
    var sql = "SELECT * FROM employees";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get an employee by id
app.get("/employee/:id", (req, res) => {
    var sql = `SELECT * FROM employees WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update an employee
app.put("/employee/:id", (req, res) => {
    let employee = req.body;
    var sql = `UPDATE employees SET ? WHERE id = ${req.params.id}`;
    db.query(sql, employee, (err, result) => {
        if (err) throw err;
        res.send("Employee updated...");
    });
});

// Delete an employee
app.delete("/employee/:id", (req, res) => {
    var sql = `DELETE FROM employees WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Employee deleted...");
    });
});
