const bcrypt = require('bcryptjs');
const db = require('./db');

async function crearAdmin() {
  const password = 'Admin123';
  const hash = await bcrypt.hash(password, 10);

  try {
    await db.query(
      `INSERT INTO Cliente (nombre_usuario, numero_celular, nombre, apellido_Paterno, contraseña, id_tipo_de_usuario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['admin', '0000000000', 'Administrador', 'Sistema', hash, 2]
    );
    console.log('✅ Usuario admin creado correctamente.');
    console.log('   Usuario: admin');
    console.log('   Contraseña: Admin123');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log('⚠️  El usuario admin ya existe.');
    } else {
      console.error('❌ Error:', err.message);
    }
  }
  process.exit();
}

crearAdmin();
