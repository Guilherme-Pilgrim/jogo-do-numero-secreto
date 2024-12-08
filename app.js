let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let secretNumber = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    let mensagemP = `Escolha um numero entre 1 e ${numeroLimite}`;
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', mensagemP);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == secretNumber) {
        exibirTextoNaTela('h1', 'Acertou!');
        let paralvraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativa = (`Parabéns, você descobiu o número secreto com ${tentativas} ${paralvraTentativa}!`);
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > secretNumber) {
            exibirTextoNaTela('p', `O número secreto é menor`);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length
    
    if (quantidadeDeNumerosSorteados == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    secretNumber = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}