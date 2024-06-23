const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultsController");

// Add a result
router.post("/add-result", resultController.addResult);


// Get all results
router.get("/", resultController.getAllResults);

// Get result by rollNo
router.get("/:rollNo", resultController.getResultByRollNo);

// Update a result
router.put("/update-result/:rollNo", resultController.updateResult);

// Delete a result
router.delete("/delete-result/:rollNo", resultController.deleteResult);

module.exports = router;
