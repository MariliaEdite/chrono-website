// simulacao_agenda.js

document.addEventListener('DOMContentLoaded', () => {
    const tarefas = document.querySelectorAll('.tarefa');
    const timeslots = document.querySelectorAll('.timeslot');

    // Adiciona os eventos de arrastar e soltar para cada tarefa
    tarefas.forEach(tarefa => {
        tarefa.addEventListener('dragstart', dragStart);
    });

    // Configura os eventos de "dragover" e "drop" para cada intervalo de tempo na agenda
    timeslots.forEach(timeslot => {
        timeslot.addEventListener('dragover', dragOver);
        timeslot.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.setData('text/html', event.target.outerHTML);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', event.target.outerHTML);
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
