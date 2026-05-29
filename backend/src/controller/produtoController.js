const pool = require("../database/connection");

const criarVenda = async (req, res) => {

  const {
    produto_id,
    quantidade,
    pagamento,
    valor_recebido
  } = req.body;

  try {

    // BUSCAR PRODUTO
    const [produtos] = await pool.query(
      "SELECT * FROM produtos WHERE id = ?",
      [produto_id]
    );

    if (produtos.length === 0) {

      return res.status(404).json({
        mensagem: "Produto não encontrado"
      });
    }

    const produto = produtos[0];

    // VALIDAR ESTOQUE
    if (produto.estoque < quantidade) {

      return res.status(400).json({
        mensagem: "Estoque insuficiente"
      });
    }

    // CALCULAR TOTAL
    const total = produto.preco * quantidade;

    // CALCULAR TROCO
    const troco =
      pagamento === "Dinheiro"
        ? valor_recebido - total
        : 0;

    // INSERIR VENDA
    const [vendaResult] = await pool.query(
      `INSERT INTO vendas
      (total, pagamento, valor_recebido, troco)
      VALUES (?, ?, ?, ?)`,
      [
        total,
        pagamento,
        valor_recebido,
        troco
      ]
    );

    // INSERIR ITEM
    await pool.query(
      `INSERT INTO itens_venda
      (venda_id, produto_id, quantidade, preco)
      VALUES (?, ?, ?, ?)`,
      [
        vendaResult.insertId,
        produto_id,
        quantidade,
        produto.preco
      ]
    );

    // ATUALIZAR ESTOQUE
    await pool.query(
      `UPDATE produtos
      SET estoque = estoque - ?
      WHERE id = ?`,
      [quantidade, produto_id]
    );

    res.json({
      mensagem: "Venda realizada com sucesso!",
      venda_id: vendaResult.insertId,
      total,
      pagamento,
      valor_recebido,
      troco
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      mensagem: "Erro ao realizar venda!"
    });
  }
};

module.exports = {
  criarVenda
};