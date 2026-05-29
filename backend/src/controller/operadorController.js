const connection = require('../database/connection');

// LOGIN DO OPERADOR
async function loginOperador(req, res) {
    try {

        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome e senha obrigatórios'
            });
        }

        const sql = `
            SELECT * FROM operadores
            WHERE nome = ? AND senha = ?
        `;

        connection.query(sql, [nome, senha], (erro, resultado) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro no servidor'
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Operador inválido'
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso',
                operador: resultado[0]
            });

        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno'
        });
    }
}

// LISTAR OPERADORES
async function listarOperadores(req, res) {

    try {

        const sql = 'SELECT id, nome FROM operadores';

        connection.query(sql, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro ao listar operadores'
                });
            }

            return res.status(200).json(resultado);

        });

    } catch (erro) {

        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno'
        });
    }
}

// ENCERRAR OPERAÇÕES
async function encerrarOperacoes(req, res) {

    try {

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Operações encerradas com sucesso'
        });

    } catch (erro) {

        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao encerrar operações'
        });
    }
}

module.exports = {
    loginOperador,
    listarOperadores,
    encerrarOperacoes
};