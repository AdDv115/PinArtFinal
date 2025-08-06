router.post('/compras', async (req, res) => {
    const { usuario_id, total } = req.body;
  
    try {
      const [resultado] = await db.query(
        'INSERT INTO compras (usuario_id, total) VALUES (?, ?)',
        [usuario_id, total]
      );
      res.json({ success: true, compraId: resultado.insertId });
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      res.status(500).json({ success: false, message: 'Error al registrar la compra' });
    }
  });
  