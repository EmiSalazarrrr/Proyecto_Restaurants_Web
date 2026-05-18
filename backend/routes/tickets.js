const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, c.nombre, c.apellido_Paterno
      FROM Ticket t
      LEFT JOIN Cliente c ON t.nombre_usuario = c.nombre_usuario
      ORDER BY t.fecha DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener un ticket por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, c.nombre, c.apellido_Paterno
      FROM Ticket t
      LEFT JOIN Cliente c ON t.nombre_usuario = c.nombre_usuario
      WHERE t.id_ticket = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Ticket no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear un ticket
router.post('/', async (req, res) => {
  const { precio_final, nombre_usuario, codigounico, id_promocion } = req.body;
  if (!precio_final || !codigounico) {
    return res.status(400).json({ error: 'precio_final y codigounico son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO Ticket (precio_final, nombre_usuario, codigounico, id_promocion) VALUES (?, ?, ?, ?)',
      [precio_final, nombre_usuario || null, codigounico, id_promocion || null]
    );
    res.status(201).json({ id: result.insertId, precio_final, codigounico });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya existe un ticket con ese codigo unico' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar un ticket
router.put('/:id', async (req, res) => {
  const { precio_final, canjeado, id_promocion } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Ticket SET precio_final = ?, canjeado = ?, id_promocion = ? WHERE id_ticket = ?',
      [precio_final, canjeado ?? 0, id_promocion || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ticket no encontrado' });
    res.json({ mensaje: 'Ticket actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar un ticket
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Ticket WHERE id_ticket = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ticket no encontrado' });
    res.json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
