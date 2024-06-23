const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Database connection
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database");
});

// Routes
const studentRoutes = require("./routes/students");
const resultRoutes = require("./routes/results");

app.use("/students", studentRoutes);
app.use("/results", resultRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
