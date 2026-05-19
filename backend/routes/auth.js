const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// POST - Login
router.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  if (!nombre_usuario || !contrasena)
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });

  try {
    const [rows] = await db.query(
      'SELECT c.*, p.tipo_de_usuario FROM Cliente c JOIN Perfiles p ON c.id_tipo_de_usuario = p.id_tipo_de_usuario WHERE c.nombre_usuario = ?',
      [nombre_usuario]
    );
    if (rows.length === 0)
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });

    const usuario = rows[0];
    const valido = await bcrypt.compare(contrasena, usuario.contraseña);
    if (!valido)
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });

    res.json({
      nombre_usuario: usuario.nombre_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido_Paterno,
      tipo: usuario.tipo_de_usuario,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Registro
router.post('/registro', async (req, res) => {
  const { nombre_usuario, nombre, apellido_Paterno, apellido_materno, numero_celular, contrasena } = req.body;

  if (!nombre_usuario || !nombre || !apellido_Paterno || !numero_celular || !contrasena)
    return res.status(400).json({ error: 'Completa todos los campos obligatorios.' });

  if (contrasena.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });

  try {
    const hash = await bcrypt.hash(contrasena, 10);
    await db.query(
      `INSERT INTO Cliente (nombre_usuario, nombre, apellido_Paterno, apellido_materno, numero_celular, contraseña, id_tipo_de_usuario)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [nombre_usuario, nombre, apellido_Paterno, apellido_materno || null, numero_celular, hash]
    );
    res.status(201).json({ mensaje: 'Cuenta creada correctamente.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('nombre_usuario'))
        return res.status(400).json({ error: 'Ese nombre de usuario ya está en uso.' });
      if (err.message.includes('numero_celular'))
        return res.status(400).json({ error: 'Ese número de celular ya está registrado.' });
      return res.status(400).json({ error: 'Dato duplicado.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET - Listar todos los clientes (para dropdown)
router.get('/clientes', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT nombre_usuario, nombre, apellido_Paterno FROM Cliente WHERE id_tipo_de_usuario = 1 ORDER BY nombre'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
