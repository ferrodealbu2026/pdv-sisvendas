// CONTROLE SISTEMA
let sistemaLiberado = false;

let senhasOperadores = JSON.parse(

    localStorage.getItem(
    "senhasOperadores")

) || {

    "OPERADOR 1": "123456",
    "OPERADOR 2": "456789",
    "OPERADOR 3": "135790"

};

// SENHA MASTER

const codigoMaster = "999999";

// NOME DO CHEFE

const nomeChefe = "ADMIN";

// ELEMENTOS

const produtoSelect =
document.getElementById('produto');

const quantidadeInput =
document.getElementById('quantidade');

const precoInput =
document.getElementById('preco');

const subtotalInput =
document.getElementById('subtotal');

const totalSpan =
document.getElementById('total');

const pagamentoSelect =
document.getElementById('pagamento');

const recebidoInput =
document.getElementById('recebido');

const totalPagoInput =
document.getElementById('totalPago');

const trocoInput =
document.getElementById('troco');

const datahoraInput =
document.getElementById('datahora');

const reciboDiv =
document.getElementById('recibo');

const historicoDiv =
document.getElementById('historico');

const idProdutoInput =
document.getElementById('idProduto');

const operadorInput =
document.getElementById('operador');


// PRODUTOS

const produtos = [

    { id: 1, nome: 'Coca-Cola', preco: 6.00 },
    { id: 2, nome: 'Hambúrguer', preco: 15.00 },
    { id: 3, nome: 'Batata Frita', preco: 10.00 },
    { id: 4, nome: 'Água Mineral', preco: 3.50 }

];

// CARREGAR PRODUTOS

function carregarProdutos(){

    produtos.forEach(produto => {

        const option = document.createElement('option');

        option.value = produto.id;
        option.textContent = produto.nome;

        produtoSelect.appendChild(option);

    });

}


// ATUALIZAR PRODUTO

function atualizarProduto(){

    const id = produtoSelect.value;

    const produto = produtos.find(p => p.id == id);

    if(!produto) return;

    idProdutoInput.value = produto.id;

    const quantidade = parseInt(quantidadeInput.value) || 1;

    const subtotal = produto.preco * quantidade;

    precoInput.value = produto.preco.toFixed(2);

    subtotalInput.value = subtotal.toFixed(2);

    totalSpan.innerText = `R$ ${subtotal.toFixed(2)}`;

    totalPagoInput.value = subtotal.toFixed(2);

    datahoraInput.value = new Date().toLocaleString();

    calcularTroco();
}


// CALCULAR TROCO

function calcularTroco(){

    const id = produtoSelect.value;

    const produto = produtos.find(p => p.id == id);

    if(!produto) return;

    const quantidade = parseInt(quantidadeInput.value) || 1;

    const subtotal = produto.preco * quantidade;

    const recebido = parseFloat(recebidoInput.value) || 0;

    const pagamento = pagamentoSelect.value;

    let troco = 0;

    if(pagamento === 'Dinheiro'){

        troco = recebido - subtotal;

        if(troco < 0) troco = 0;

    }

    trocoInput.value = troco.toFixed(2);
}


// LIMPAR TELA

function limparTela(){

    idProdutoInput.value = "";
    produtoSelect.value = "";
    quantidadeInput.value = 1;
    precoInput.value = "";
    subtotalInput.value = "";
    totalSpan.innerText = "R$ 0,00";
    recebidoInput.value = "";
    totalPagoInput.value = "";
    trocoInput.value = "";
    datahoraInput.value = "";
}


// FINALIZAR VENDA

function finalizarVenda(){

    if(!sistemaLiberado){

    alert("Senha do Operador");
    return;

}

    const operador = operadorInput.value;

    const id = produtoSelect.value;

    const produto = produtos.find(p => p.id == id);

    if(!produto){

        alert("Selecione produto");
        return;

    }

    const quantidade = quantidadeInput.value;


    // VALIDAR PAGAMENTO

    const total = subtotalInput.value;

    const recebido = parseFloat(recebidoInput.value) || 0;

if(
    pagamentoSelect.value === "Dinheiro" &&
    recebido < parseFloat(total)
){

    alert("Valor insuficiente para pagamento!");
    return;

}

    const dataHora = new Date().toLocaleString();

    historicoDiv.innerHTML += `

        <div class="historico-linha">

            <div>${produto.id}</div>
            <div>${produto.nome}</div>
            <div>${quantidade}</div>
            <div>${total}</div>
            <div>${dataHora}</div>
            <div>${operador}</div>

        </div>

    `;

    alert("Venda realizada com sucesso!");

    limparTela();
}


// NOTA FISCAL

function notaFiscal(){

    const id = produtoSelect.value;

    const produto = produtos.find(p => p.id == id);

    if(!produto){

        alert("Selecione produto");
        return;

    }

    const quantidade = quantidadeInput.value;

    const subtotal = subtotalInput.value;

    const pagamento = pagamentoSelect.value;

    const troco = trocoInput.value;

    const data = new Date().toLocaleString();

    reciboDiv.style.display = 'block';

    reciboDiv.innerHTML = `

        <h2>PDV SISVENDAS</h2>
        <hr>

        <p>Produto: ${produto.nome}</p>
        <p>Quantidade: ${quantidade}</p>
        <p>Valor: R$ ${subtotal}</p>
        <p>Pagamento: ${pagamento}</p>
        <p>Troco: R$ ${troco}</p>
        <p>Data/Hora: ${data}</p>

        <hr>
        <p>Obrigado pela preferência</p>

    `;

    window.print();
}


// EVENTOS

produtoSelect.addEventListener('change', atualizarProduto);
quantidadeInput.addEventListener('input', atualizarProduto);
recebidoInput.addEventListener('input', calcularTroco);
pagamentoSelect.addEventListener('change', calcularTroco);

// ======================================
// LOGIN OPERADOR
// ======================================

function entrarOperador(){

    const senha =
    document.getElementById(
    "senhaOperador").value;

    if(
        senha === "123456" ||
        senha === "456789" ||
        senha === "135790"
    ){

        sistemaLiberado = true;

        if(senha === "123456"){
            operadorInput.value = "OPERADOR 1";
        }

        if(senha === "456789"){
            operadorInput.value = "OPERADOR 2";
        }

        if(senha === "135790"){
            operadorInput.value = "OPERADOR 3";
        }

        // ESCONDE LOGIN

        document.getElementById(
        "loginTela").style.display = "none";

        // MOSTRA SISTEMA

        document.querySelector(
        ".container").style.display = "block";

        alert("Operador liberado!");

    } else {

        alert("Senha incorreta");

    }

}

// ======================================
// REDEFINIR SENHA
// ======================================

function redefinirSenha(){

    const chefe =
    prompt("Nome do chefe:");

    if(chefe !== "ADMIN"){

        alert("Chefe inválido");
        return;

    }

    const codigo =
    prompt("Código master:");

    if(codigo !== "999999"){

        alert("Código master inválido");
        return;

    }

    const operador =
    prompt(
    "Qual operador deseja alterar?\n" +
    "OPERADOR 1\n" +
    "OPERADOR 2\n" +
    "OPERADOR 3"
    );

    if(!senhasOperadores[operador]){

        alert("Operador não encontrado");
        return;

    }

    const novaSenha =
    prompt(
    "Nova senha (6 números):"
    );

    // VALIDA TAMANHO

    if(novaSenha.length !== 6){

        alert(
        "Senha deve ter 6 números"
        );

        return;

    }

    // SOMENTE NÚMEROS

    if(isNaN(novaSenha)){

        alert(
        "Senha deve conter apenas números"
        );

        return;

    }

    senhasOperadores[operador] =
    novaSenha;

    // SALVA

    localStorage.setItem(

        "senhasOperadores",

        JSON.stringify(
        senhasOperadores
        )

    );

    alert(
    "Senha alterada com sucesso!"
    );

}
    
// ENCERRAR OPERAÇÕES

function encerrarOperações(){

    const confirmar =
    confirm("Deseja encerrar operações?");

    if(!confirmar){

        return;
    }

    // APAGA HISTÓRICO
    historicoDiv.innerHTML = "";

    // LIMPA RECIBO
    reciboDiv.innerHTML = "";

    reciboDiv.style.display = "none";

    // LIMPA CAMPOS
    limparTela();

    // LIMPA OPERADOR
    operadorInput.value = "";

    // MENSAGEM
    alert("Operação encerrada com sucesso!");

    // REINICIA SISTEMA
    location.reload();

}

// EVENTOS
produtoSelect.addEventListener(
'change',
atualizarProduto
);

quantidadeInput.addEventListener(
'input',
atualizarProduto
);

recebidoInput.addEventListener(
'input',
calcularTroco
);

pagamentoSelect.addEventListener(
'change',
calcularTroco
);

// INICIAR SISTEMA
carregarProdutos();