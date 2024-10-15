const express = require("express");
const pool = require("../config/db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Get available trains between two stations
router.get("/trains", authenticateToken, async (req, res) => {
  const { source, destination } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM trains WHERE source = $1 AND destination = $2",
      [source, destination]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Book a seat on a train
router.post("/book", authenticateToken, async (req, res) => {
  const client = await pool.connect();
  const { train_id, source, destination } = req.body;
  const user_id = req.user.id;

  try {
    await client.query("BEGIN");
    const trainQuery = "SELECT * FROM trains WHERE id = $1 FOR UPDATE";
    const result = await client.query(trainQuery, [train_id]);
    const train = result.rows[0];

    if (!train || train.available_seats <= 0) {
      throw new Error("No available seats");
    }

    const updateSeatsQuery =
      "UPDATE trains SET available_seats = available_seats - 1 WHERE id = $1";
    await client.query(updateSeatsQuery, [train_id]);

    const bookingQuery =
      "INSERT INTO bookings (user_id, train_id, source, destination) VALUES ($1, $2, $3, $4) RETURNING *";
    const bookingResult = await client.query(bookingQuery, [
      user_id,
      train_id,
      source,
      destination,
    ]);

    await client.query("COMMIT");
    res
      .status(200)
      .json({ message: "Booking successful", booking: bookingResult.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
