const express = require("express");
var app = express();
const bodyparser = require("body-parser");
var multer = require("multer");
var connectionProvider = require("./config/mysqlConnectionStringProvider"); //connection path

app.use(bodyparser.json());
const upload = multer({ dest: __dirname + "/uploads/images" });
app.use(express.static("public"));

const PORT = process.env.PORT || 3000; // process.env.PORT

app.listen(PORT, () =>
  console.log("Express server is runnig at port no :", PORT)
);

var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

//Get all employees
app.get("/allProductList", (req, res) => {
  connection.query("SELECT * FROM v_product_list", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/getProductItemByState/:stateCode", (req, res) => {
  connection.query(
    "SELECT * FROM v_product_list WHERE state_code = ?",
    [req.params.stateCode],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Image upload api html in node server only
//upload.array()  --for multiplw image upload
app.post("/upload", upload.single("photo"), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else throw "error";
});

//Delete an employees
// app.delete("/employees/:id", (req, res) => {
//   connection.query(
//     "DELETE FROM Employee WHERE EmpID = ?",
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) res.send("Deleted successfully.");
//       else console.log(err);
//     }
//   );
// });

//Insert an employees
// app.post("/employees", (req, res) => {
//   let emp = req.body;
//   var sql =
//     "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//   connection.query(
//     sql,
//     [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
//     (err, rows, fields) => {
//       if (!err)
//         rows.forEach((element) => {
//           if (element.constructor == Array)
//             res.send("Inserted employee id : " + element[0].EmpID);
//         });
//       else console.log(err);
//     }
//   );
// });

//Update an employees
// app.put("/employees", (req, res) => {
//   let emp = req.body;
//   var sql =
//     "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//   connection.query(
//     sql,
//     [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
//     (err, rows, fields) => {
//       if (!err) res.send("Updated successfully");
//       else console.log(err);
//     }
//   );
// });
