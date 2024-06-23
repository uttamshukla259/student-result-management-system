const con = require("../db");

exports.getAllResults = (req, res) => {
  const sql = "SELECT * FROM studentresult";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      res.status(500).send("Error retrieving data from the database.");
      return;
    }
    res.json(result);
  });
};


exports.addResult = (req, res) => {
  const { rollNo, MATH, CHEMISTRY, PHYSICS, ENGLISH, ELECTRICAL, TOTAL } =
    req.body;
  const sql =
    "INSERT INTO studentresult (rollNo, MATH, CHEMISTRY, PHYSICS, ENGLISH, ELECTRICAL, TOTAL) VALUES (?, ?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [rollNo, MATH, CHEMISTRY, PHYSICS, ENGLISH, ELECTRICAL, TOTAL],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        res.status(500).send("Error inserting data into the database.");
        return;
      }
      res.send("Result added successfully");
    }
  );
};

exports.getResultByRollNo = (req, res) => {
  const rollNo = req.params.rollNo;
  const sql = `
    SELECT sd.rollNo, sd.name, sd.gender, sd.branchName, sd.fathername, 
           sr.MATH, sr.CHEMISTRY, sr.PHYSICS, sr.ENGLISH, sr.ELECTRICAL, sr.TOTAL
    FROM studentresult sr
    JOIN studentdetails sd ON sr.rollNo = sd.rollNo
    WHERE sr.rollNo = ?
  `;
  con.query(sql, [rollNo], (err, result) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      res.status(500).send("Error retrieving data from the database.");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("No result found for the entered Roll No.");
    } else {
      res.json(result[0]);
    }
  });
};

exports.updateResult = (req, res) => {
  const originalRollNo = req.params.rollNo;
  const { MATH, CHEMISTRY, PHYSICS, ENGLISH, ELECTRICAL, TOTAL } = req.body;
  const sql =
    "UPDATE studentresult SET MATH = ?, CHEMISTRY = ?, PHYSICS = ?, ENGLISH = ?, ELECTRICAL = ?, TOTAL = ? WHERE rollNo = ?";
  con.query(
    sql,
    [MATH, CHEMISTRY, PHYSICS, ENGLISH, ELECTRICAL, TOTAL, originalRollNo],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err.message);
        res.status(500).send("Error updating data in the database.");
        return;
      }
      res.send("Result updated successfully");
    }
  );
};

exports.deleteResult = (req, res) => {
  const sql = "DELETE FROM studentresult WHERE rollNo = ?";
  con.query(sql, [req.params.rollNo], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err.message);
      res.status(500).send("Error deleting data from the database.");
      return;
    }
    res.send("Result deleted successfully");
  });
};
