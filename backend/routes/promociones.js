const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Listar promociones
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Promocion ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
