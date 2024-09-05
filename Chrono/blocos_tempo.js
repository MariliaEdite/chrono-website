// blocos_tempo.js

document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const timerDisplay = document.getElementById('timer');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);

    function startTimer() {
        let time = 1500; // 25 minutos em segundos
        timerInterval = setInterval(() => {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (time <= 0) {
                clearInterval(timerInterval);
                alert('Tempo esgotado!');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = '25:00';
    }
});

// Atualiza a pontuação no localStorage
function atualizarDesempenho(nomeJogo, pontos) {
    let desempenho = JSON.parse(localStorage.getItem('desempenhoUsuario')) || {};
    desempenho[nomeJogo] = pontos;
    localStorage.setItem('desempenhoUsuario', JSON.stringify(desempenho));
}

// No final do jogo, quando o usuário clicar no botão
document.getElementById('botaoJogo').addEventListener('click', function() {
    if (!jogoEmAndamento) return;

    const tempoReacao = (Date.now() - tempoInicio) / 1000; // Converte para segundos
    jogoEmAndamento = false;

    const botao = document.getElementById('botaoJogo');
    botao.style.backgroundColor = '#ff0000';
    botao.textContent = 'Pronto';

    // Exibe o tempo de reação em segundos
    document.getElementById('mensagemResultado').textContent = `Seu tempo de reação foi de ${tempoReacao.toFixed(2)} segundos.`;

    // Atualiza o desempenho do usuário
    atualizarDesempenho('Clique Rápido', tempoReacao.toFixed(2));
});
