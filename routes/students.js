const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentsController");

// Add a student
router.post("/add-student", studentController.addStudent);

// Get all students
router.get("/", studentController.getAllStudents);

// Update a student
router.put("/update-student/:rollNo", studentController.updateStudent);

// Delete a student
router.delete("/delete-student/:rollNo", studentController.deleteStudent);

module.exports = router;
