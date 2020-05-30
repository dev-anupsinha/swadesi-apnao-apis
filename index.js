const express = require("express");
var app = express();
const bodyparser = require("body-parser");
var connectionProvider = require("./config/mysqlConnectionStringProvider"); //connection path

app.use(bodyparser.json());

app.listen(process.env.PORT, () =>
  console.log("Express server is runnig at port no : 3000")
);

var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

//Get all employees
app.get("/employees", (req, res) => {
  connection.query("SELECT * FROM tbl_employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/employees/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.delete("/employees/:id", (req, res) => {
  connection.query(
    "DELETE FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//Insert an employees
app.post("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  connection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            res.send("Inserted employee id : " + element[0].EmpID);
        });
      else console.log(err);
    }
  );
});

//Update an employees
app.put("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  connection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});
