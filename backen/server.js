const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const session = require('express-session');
const carrito = require('./routes/carrito');

const app = express();
const PORT = 5000;

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pintart',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Rutas
app.use('/api', carrito);

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, contrasena, 'usuario']
    );
    res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error al registrar:', err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Inicio de sesión
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const [results] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const usuario = results[0];
    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    };

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: req.session.user });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Obtener carrito
app.get('/api/carrito/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM carrito WHERE usuario_id = ?',
      [usuarioId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});

// Actualizar perfil
app.post('/api/actualizar', async (req, res) => {
  const { id, nombre, biografia, avatar } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, biografia = ?, avatar = ? WHERE id = ?',
      [nombre, biografia, avatar, id]
    );
    res.status(200).json({ message: 'Perfil actualizado con éxito', user: req.body });
  } catch (err) {
    console.error('Error al actualizar:', err);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});