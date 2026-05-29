require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const operadorRoutes = require('./routes/operadorRoutes');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROTAS
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);
app.use('/operador', operadorRoutes);


// CONEXÃO MYSQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// TESTE
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// LISTAR PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.post("/vendas", async (req, res) => {
  const { itens, total, pagamento, valorRecebido, troco } = req.body;

  if (!itens || itens.length === 0) {
    return res.status(400).json({ erro: "Carrinho vazio" });
  }

  let conn;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // CRIA A VENDA PRIMEIRO
    const [vendaResult] = await conn.query(
      `INSERT INTO vendas (total, pagamento, valor_recebido, troco)
       VALUES (?, ?, ?, ?)`,
      [total, pagamento, valorRecebido, troco]
    );

    const vendaId = vendaResult.insertId;

    // PROCESSA CADA ITEM
    for (const item of itens) {

      //  VERIFICA ESTOQUE PRIMEIRO (CORRETO)
      const [produtoRows] = await conn.query(
        "SELECT estoque FROM produtos WHERE id = ?",
        [item.id]
      );

      if (produtoRows.length === 0) {
        throw new Error(`Produto ${item.id} não encontrado`);
      }

      const estoqueAtual = produtoRows[0].estoque;

      if (estoqueAtual < item.quantidade) {
        throw new Error(`Estoque insuficiente para produto ${item.id}`);
      }

      //  INSERE ITEM DA VENDA (SÓ SE TIVER ESTOQUE)
      await conn.query(
        `INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco)
         VALUES (?, ?, ?, ?)`,
        [vendaId, item.id, item.quantidade, item.preco]
      );

      //  BAIXA ESTOQUE
      await conn.query(
        `UPDATE produtos 
         SET estoque = estoque - ? 
         WHERE id = ?`,
        [item.quantidade, item.id]
      );
    }

    //  CONFIRMA TRANSAÇÃO
    await conn.commit();

    res.json({ mensagem: "Venda realizada com sucesso!" });

  } catch (err) {
    if (conn) await conn.rollback();

    console.error("ERRO NA VENDA:", err.message);

    res.status(500).json({
      erro: err.message || "Erro ao salvar venda"
    });

  } finally {
    if (conn) conn.release();
  }
});

// START SERVER
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  }); 
