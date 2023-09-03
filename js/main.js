window.onload = () => {

    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}

let jogadorAtual = 'X';
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogoEncerrado = false;


const elementoTabuleiro = document.getElementById('tabuleiro');
const elementoStatus = document.getElementById('status');
const botaoReiniciar = document.getElementById('botao-reiniciar');


function verificarVencedor() {
    const padroesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const padrao of padroesVitoria) {
        const [a, b, c] = padrao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a];
        }
    }

    if (tabuleiro.every(celula => celula !== '')) {
        return 'Empate';
    }

    return null;
}



function atualizarStatus() {
    const vencedor = verificarVencedor();
    if (vencedor) {
        if (vencedor === 'Empate') {
            elementoStatus.textContent = 'Empate!';
        } else {
            elementoStatus.textContent = `Vencedor: Jogador ${vencedor}`;
        }
        jogoEncerrado = true;
    } else {
        elementoStatus.textContent = `Vez do Jogador ${jogadorAtual}`;
    }
}


function lidarComCliqueCelula(evento) {
    const celula = evento.target;
    const indiceCelula = Array.from(elementoTabuleiro.children).indexOf(celula);

    if (tabuleiro[indiceCelula] === '' && !jogoEncerrado) {
        tabuleiro[indiceCelula] = jogadorAtual;
        celula.textContent = jogadorAtual;
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        atualizarStatus();
    }
}


for (let i = 0; i < 9; i++) {
    const celula = document.createElement('div');
    celula.className = 'celula';
    celula.addEventListener('click', lidarComCliqueCelula);
    elementoTabuleiro.appendChild(celula);
}


function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = 'X';
    jogoEncerrado = false;
    elementoStatus.textContent = 'Vez do Jogador X';
    Array.from(elementoTabuleiro.children).forEach(celula => {
        celula.textContent = '';
    });
}

botaoReiniciar.addEventListener('click', reiniciarJogo);

reiniciarJogo();
