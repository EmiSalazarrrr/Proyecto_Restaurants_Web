const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Stats del cliente
router.get('/:usuario/stats', async (req, res) => {
  try {
    const [tickets] = await db.query(
      'SELECT COUNT(*) as visitas, COALESCE(SUM(precio_final), 0) as consumido FROM Ticket WHERE nombre_usuario = ?',
      [req.params.usuario]
    );
    const [productos] = await db.query(
      `SELECT COUNT(DISTINCT pp.id_alimentosbebidas) as productos
       FROM Ticket t
       JOIN detalleticket dt ON dt.id_ticket = t.id_ticket
       JOIN ProductoPedido pp ON pp.id_productopedido = dt.id_productopedido
       WHERE t.nombre_usuario = ?`,
      [req.params.usuario]
    );
    res.json({
      visitas: tickets[0].visitas,
      consumido: tickets[0].consumido,
      productos: productos[0].productos,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Tickets del cliente
router.get('/:usuario/tickets', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Ticket WHERE nombre_usuario = ? ORDER BY fecha DESC LIMIT 5',
      [req.params.usuario]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
