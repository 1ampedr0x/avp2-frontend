let primeira = null;
let segunda = null;
let bloqueado = false;
let jogadorAtual = 1;
let pontos1 = 0;
let pontos2 = 0;
let pares = 0;

function atualizarTela() {
    document.getElementById('pontos1').innerHTML = pontos1;
    document.getElementById('pontos2').innerHTML = pontos2;
    document.getElementById('mensagem').innerHTML = 'Vez do Jogador ' + jogadorAtual;

    if (jogadorAtual === 1) {
        document.getElementById('jogador1').className = 'jogador ativo';
        document.getElementById('jogador2').className = 'jogador';
    } else {
        document.getElementById('jogador2').className = 'jogador ativo';
        document.getElementById('jogador1').className = 'jogador';
    }
}

function iniciarJogo() {
    let frutas = ['🍎', '🍎', '🍒', '🍒', '🍇', '🍇', '🍓', '🍓', '🍊', '🍊', '🍉', '🍉', '🍍', '🍍', '🥝', '🥝'];
    frutas.sort(function () {
        return Math.random() - 0.5;
    });

    for (let i = 1; i <= 16; i++) {
        document.getElementById('carta' + i).innerHTML = frutas[i - 1];
        document.getElementById('carta' + i).className = 'carta';
    }

    primeira = null;
    segunda = null;
    bloqueado = false;
    jogadorAtual = 1;
    pontos1 = 0;
    pontos2 = 0;
    pares = 0;

    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultado').hidden = true;
    document.getElementById('reiniciar').hidden = true;
    atualizarTela();
}

function clicar(carta) {
    if (bloqueado || carta.classList.contains('virada') || carta.classList.contains('encontrada')) {
        return;
    }

    carta.className = 'carta virada';

    if (primeira === null) {
        primeira = carta;
        return;
    }

    segunda = carta;

    if (primeira.innerHTML === segunda.innerHTML) {
        primeira.className = 'carta encontrada';
        segunda.className = 'carta encontrada';
        primeira = null;
        segunda = null;

        if (jogadorAtual === 1) {
            pontos1++;
        } else {
            pontos2++;
        }
        pares++;
        atualizarTela();

        if (pares === 8) {
            terminarJogo();
        }
        return;
    }

    bloqueado = true;
    let carta1 = primeira;
    let carta2 = segunda;

    setTimeout(function () {
        carta1.className = 'carta';
        carta2.className = 'carta';
        primeira = null;
        segunda = null;
        if (jogadorAtual === 1) {
            jogadorAtual = 2;
        } else {
            jogadorAtual = 1;
        }
        bloqueado = false;
        atualizarTela();
    }, 1000);
}

function terminarJogo() {
    bloqueado = true;
    document.getElementById('mensagem').innerHTML = 'Fim de jogo!';
    document.getElementById('jogador1').className = 'jogador';
    document.getElementById('jogador2').className = 'jogador';

    let texto;
    if (pontos1 === pontos2) {
        texto = 'Empate! (' + pontos1 + ' × ' + pontos2 + ')';
    } else if (pontos1 > pontos2) {
        texto = 'Jogador 1 venceu! (' + pontos1 + ' × ' + pontos2 + ')';
    } else {
        texto = 'Jogador 2 venceu! (' + pontos1 + ' × ' + pontos2 + ')';
    }

    document.getElementById('resultado').innerHTML = texto;
    document.getElementById('resultado').hidden = false;
    document.getElementById('reiniciar').hidden = false;
}

document.getElementById('reiniciar').onclick = iniciarJogo;
iniciarJogo();
