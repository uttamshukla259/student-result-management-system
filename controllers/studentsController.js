const con = require("../db");

exports.addStudent = (req, res) => {
  const { name, rollNo, gender, fathername, courseName, branchName } = req.body;
  const sql =
    "INSERT INTO studentdetails (name, rollNo, gender, fathername, courseName, branchName) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [name, rollNo, gender, fathername, courseName, branchName],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        res.status(500).send("Error inserting data into the database.");
        return;
      }
      res.send("Student added successfully");
    }
  );
};

exports.getAllStudents = (req, res) => {
  const sql = "SELECT * FROM studentdetails";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      res.status(500).send("Error retrieving data from the database.");
      return;
    }
    res.json(result);
  });
};

exports.updateStudent = (req, res) => {
  const originalRollNo = req.params.rollNo;
  const { name, gender, fathername, courseName, branchName } = req.body;
  const sql =
    "UPDATE studentdetails SET name = ?, gender = ?, fathername = ?, courseName = ?, branchName = ? WHERE rollNo = ?";
  con.query(
    sql,
    [name, gender, fathername, courseName, branchName, originalRollNo],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err.message);
        res.status(500).send("Error updating data in the database.");
        return;
      }
      res.send("Student updated successfully");
    }
  );
};

exports.deleteStudent = (req, res) => {
  const sql = "DELETE FROM studentdetails WHERE rollNo = ?";
  con.query(sql, [req.params.rollNo], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err.message);
      res.status(500).send("Error deleting data from the database.");
      return;
    }
    res.send("Student deleted successfully");
  });
};
