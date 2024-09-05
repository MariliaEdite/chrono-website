// desafio_pomodoro.js

document.addEventListener('DOMContentLoaded', () => {
    let pomodoroInterval;
    const startButton = document.getElementById('pomodoro-start');
    const stopButton = document.getElementById('pomodoro-stop');
    const pomodoroDisplay = document.getElementById('pomodoro-display');

    startButton.addEventListener('click', startPomodoro);
    stopButton.addEventListener('click', stopPomodoro);

    function startPomodoro() {
        let time = 1500; // 25 minutos em segundos
        pomodoroInterval = setInterval(() => {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            pomodoroDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (time <= 0) {
                clearInterval(pomodoroInterval);
                alert('Pomodoro completo! Hora de uma pausa.');
                setTimeout(() => {
                    alert('Pausa concluída! Vamos para o próximo Pomodoro.');
                    startPomodoro();
                }, 300000); // Pausa de 5 minutos
            }
        }, 1000);
    }

    function stopPomodoro() {
        clearInterval(pomodoroInterval);
        pomodoroDisplay.textContent = '25:00';
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
