// prioridade_tarefas.js

document.addEventListener('DOMContentLoaded', () => {
    const tarefas = document.querySelectorAll('.tarefa');
    const quadrantes = document.querySelectorAll('.quadrante');

    tarefas.forEach(tarefa => {
        tarefa.addEventListener('dragstart', dragStart);
    });

    quadrantes.forEach(quadrante => {
        quadrante.addEventListener('dragover', dragOver);
        quadrante.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
        event.dataTransfer.setData('text/html', event.target.outerHTML);
        event.dataTransfer.effectAllowed = 'move';
    }

    function dragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    function drop(event) {
        event.preventDefault();
        const tarefaHTML = event.dataTransfer.getData('text/html');
        const tarefaElement = document.createElement('div');
        tarefaElement.innerHTML = tarefaHTML;
        tarefaElement.className = 'tarefa';
        tarefaElement.draggable = true;
        tarefaElement.addEventListener('dragstart', dragStart);
        event.target.appendChild(tarefaElement);
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
