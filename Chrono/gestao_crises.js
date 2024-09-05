// gestao_crises.js

document.addEventListener('DOMContentLoaded', () => {
    const opcoes = document.querySelectorAll('.opcao');

    opcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            const resposta = opcao.getAttribute('data-resposta');
            if (resposta === 'certa') {
                alert('Boa escolha! Você lidou bem com a crise.');
            } else {
                alert('Escolha incorreta! Tente novamente.');
            }
        });
    });
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
