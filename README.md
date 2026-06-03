PROJETO PDV-SISVENDAS

Sistema de PDV (Ponto de Venda) - Operações de Caixa para supermercados desenvolvido como projeto prático Full Stack, abordando o fluxo de operações comerciais de venda.

O sistema permite Autenticação de Operador, Registro de Vendas, Cálculo Automático de Valores, emissão simulada de comprovante Nota Fiscal, Finalizaçao de Venda, Histórico de Operações e Encerramento de Operações.

DEMONSTRAÇAO ONLINE

Frontend: https://pdv-sisvendas.vercel.app

Backend: https://pdv-sisvendas-api.onrender.com

TECNOLOGIAS USADAS
Frontend
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Banco de Dados
MySQL
Ferramentas
Git
GitHub
Vercel
Render

FUNCIONALIDADES

Login de operador
Controle de vendas
Seleção dinâmica de produtos
Cálculo automático de subtotal
Reconhecimento do valor a pagar
Cálculo automático de troco
Finalização de venda
Simulação de nota fiscal
Histórico de vendas
Encerramento de operações
Reinício de autenticação

ESTRUTURA DO PROJETO

frontend/
├── index.html
├── style.css
└── script.js

backend/
├── images/
│   ├── Login.png
│   ├── Venda.png
│   ├── FinalizarVenda.png
│   ├── Historico.png
│   └── EncerrarOperacao.png
│
├── src/
│   ├── controller/
│   │   ├── produtoController.js
│   │   └── vendaController.js
│   │
│   ├── database/
│   │   ├── connection.js
│   │   └── sisbanco.sql
│   │
│   ├── routes/
│   │   ├── produtoRoutes.js
│   │   └── vendaRoutes.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json

IMAGENS DO SISTEMA

Tela de Login

Tela de Venda

Finalização da Venda

Histórico de Vendas

Encerramento de Operações

OBJETIVO DO SISTEMA

Este projeto foi desenvolvido para aplicação prática dentro dos seguintes conceitos:

APIs REST
Integração Frontend e Backend
Manipulação de banco de dados MySQL
Persistência de dados
Lógica de negócios
Organização de aplicações Full Stack
Fluxo operacional de sistemas comerciais

COMO EXECUTAR LOCALMENTE

Backend
cd backend
npm install
npm start

ou

node src/server.js
Frontend

Abrir o arquivo index.html no navegador e inserir senha 123456/456789.

SOBRE O DESENVOLVEDOR

Fernando Rodrigues de Albuquerque.

Jun/2026 - Concluindo Análise e Desenvolvimento de Sistemas (Estácio-RJ)
Pós-graduando em Tecnologia da Informação (FAVENI-PR/2024)
Capitão da Marinha Mercante (EFOMM-CIABA-PA)
Graduado em Matemática (UFPA)
Pós-graduado em Matemática (PUC/MG)
Graduado em Ciências Físicas e Biológicas (UNISANTOS-SP)

OBJETIVO

Atualmente, encontro-me aposentado, porem, busco uma oportunidade de estágio em Analise e Desenvolvimento de Software, com foco em frontend e Backend, Node.js, Express, MySQL para aplicações Full Stack em modo homme office.

CONTATO

LinkedIn:
linkedin.com/in/ferrodealbu
GitHub:
https://github.com/ferrodealbu2026/pdv-sisvendas
Email: 
ferrodealbu2026@gmail.com
Email: 
ferrodealbu@hotmail.com