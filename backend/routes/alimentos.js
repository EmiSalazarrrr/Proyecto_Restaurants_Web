const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todos los alimentos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM AlimentosBebidas ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener un alimento por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM AlimentosBebidas WHERE id_alimentosbebidas = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Alimento no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear un alimento
router.post('/', async (req, res) => {
  const { nombre, descripcion, costo } = req.body;
  if (!nombre || !descripcion || !costo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO AlimentosBebidas (nombre, descripcion, costo) VALUES (?, ?, ?)',
      [nombre, descripcion, costo]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion, costo });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya existe un alimento con ese nombre' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar un alimento
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, costo } = req.body;
  if (!nombre || !descripcion || !costo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'UPDATE AlimentosBebidas SET nombre = ?, descripcion = ?, costo = ? WHERE id_alimentosbebidas = ?',
      [nombre, descripcion, costo, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alimento no encontrado' });
    res.json({ mensaje: 'Alimento actualizado correctamente' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya existe un alimento con ese nombre' });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar un alimento
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM AlimentosBebidas WHERE id_alimentosbebidas = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alimento no encontrado' });
    res.json({ mensaje: 'Alimento eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
