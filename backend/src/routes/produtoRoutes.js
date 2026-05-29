const express = require("express");
const router = express.Router();

const pool = require("../database/connection");

router.get("/produtos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;