const express = require("express");
const pool = require("../config/db");
const verifyAdminApiKey = require("../middleware/adminAuth");

const router = express.Router();

// Add a new train (Admin only)
router.post("/trains", verifyAdminApiKey, async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *",
      [train_name, source, destination, total_seats]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
