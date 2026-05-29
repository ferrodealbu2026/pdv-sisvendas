const connection = require('../database/connection');

const listarVendas = (req, res) => {
  const sql = 'SELECT * FROM vendas ORDER BY id DESC';

  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }

    res.status(200).json(results);
  });
};

const criarVenda = (req, res) => {
  const {
    quantidade_itens,
    subtotal,
    total,
    tipo_pagamento,
    valor_pago,
    troco
  } = req.body;

  const sql = `
    INSERT INTO vendas
    (
      quantidade_itens,
      subtotal,
      total,
      tipo_pagamento,
      valor_pago,
      troco
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      quantidade_itens,
      subtotal,
      total,
      tipo_pagamento,
      valor_pago,
      troco
    ],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }

      res.status(201).json({
        mensagem: 'Venda realizada com sucesso',
        vendaId: result.insertId
      });
    }
  );
};

module.exports = {
  listarVendas,
  criarVenda
};