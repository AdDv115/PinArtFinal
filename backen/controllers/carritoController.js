const pool = require('../db'); // conexión a la base de datos

// 1. Obtener el carrito del usuario
exports.obtenerCarrito = async (req, res) => {
  const usuario_id = req.params.usuario_id;

  try {
    const [rows] = await pool.query(`
      SELECT 
        obras.id AS id,
        obras.titulo AS nombre,
        obras.precio AS precio,
        COUNT(*) AS cantidad
      FROM carrito
      JOIN obras ON carrito.obra_id = obras.id
      WHERE carrito.usuario_id = ?
      GROUP BY obras.id
    `, [usuario_id]);

    if (rows.length === 0) {
      return res.status(200).json([]);
    }

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 2. Agregar una obra al carrito
exports.agregarAlCarrito = async (req, res) => {
  const { usuario_id, obra_id } = req.body;

  try {
    await pool.query('INSERT INTO carrito (usuario_id, obra_id) VALUES (?, ?)', [usuario_id, obra_id]);
    res.json({ mensaje: 'Obra agregada al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 3. Eliminar una unidad de una obra del carrito
exports.eliminarDelCarrito = async (req, res) => {
  const { usuario_id, obra_id } = req.body;

  try {
    const [result] = await pool.query(
      'DELETE FROM carrito WHERE usuario_id = ? AND obra_id = ? LIMIT 1',
      [usuario_id, obra_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Obra no encontrada en el carrito' });
    }

    res.json({ mensaje: 'Obra eliminada del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 4. Vaciar todo el carrito (opcional)
exports.vaciarCarrito = async (req, res) => {
  const usuario_id = req.params.usuario_id;

  try {
    await pool.query('DELETE FROM carrito WHERE usuario_id = ?', [usuario_id]);
    res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
