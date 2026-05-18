const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alimentosRoutes   = require('./routes/alimentos');
const ticketsRoutes     = require('./routes/tickets');
const clientesRoutes    = require('./routes/clientes');
const authRoutes        = require('./routes/auth');
const promocionesRoutes = require('./routes/promociones');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/alimentos',   alimentosRoutes);
app.use('/api/tickets',     ticketsRoutes);
app.use('/api/clientes',    clientesRoutes);
app.use('/api/auth',        authRoutes);
app.use('/api/promociones', promocionesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor de Restaurante funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
