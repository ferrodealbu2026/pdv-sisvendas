const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sisbanco'
};

router.post('/login', async (req, res) => {
  const { senha } = req.body;

  try {

    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.query(
      'SELECT * FROM operadores WHERE senha = ?',
      [senha]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Senha inválida'
      });
    }

    res.json({
      sucesso: true,
      operador: rows[0]
    });

  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

module.exports = router;