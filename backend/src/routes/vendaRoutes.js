const express = require('express');
const router = express.Router();

const {
  listarVendas,
  criarVenda
} = require('../controller/vendaController');

router.get('/', listarVendas);

router.post('/', criarVenda);

module.exports = router;