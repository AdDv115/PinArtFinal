const db = require('../db');
// Si estás usando bcrypt:


exports.registrar = (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  const query = 'INSERT INTO usuarios (nombre, correo, contrasena, rol, estado) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, correo, contrasena, 'usuario', 'activo'], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar' });
    res.status(200).json({ mensaje: 'Usuario registrado con éxito' });
  });
};

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(query, [correo, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Correo o contraseña incorrectos' });

    const user = results[0];
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: user });
  });
};
