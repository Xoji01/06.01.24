let tasks = [];
let currentView = 'block';
let selectedTaskIndex = null;

function openModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value;

    const newTask = {
        title,
        description,
        time,
        date
    };

    tasks.push(newTask);

    closeModal();
    displayTasks();
    updateButtonStyles();
}

function switchView(view) {
    currentView = view;
    displayTasks();
    updateButtonStyles();
}

function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskInfo = document.createElement('p');
    taskInfo.innerHTML = ` ${task.title}<br>
                           ${task.description}<br>
                           ${task.time}<br>
                           ${task.date}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Изменить';
    editButton.addEventListener('dblclick', () => showEditTaskModal(index));

    taskElement.appendChild(taskInfo);
    taskElement.appendChild(editButton);

    return taskElement;
}

function displayTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    if (currentView === 'block') {
        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            tasksContainer.appendChild(taskElement);
        });
    } else if (currentView === 'table') {
        const table = document.createElement('table');
        table.classList.add('task-table');

        const headerRow = document.createElement('tr');
        const headers = ['Заголовок задачи', 'Описание задачи', 'Время', 'Дата'];

        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        table.appendChild(headerRow);

        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Изменить';
            editButton.addEventListener('dblclick', () => showEditTaskModal(index));
            editCell.appendChild(editButton);

            Object.values(task).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            row.appendChild(editCell);
            table.appendChild(row);
        });

        tasksContainer.appendChild(table);
    }
}

function updateButtonStyles() {
    const blockButton = document.getElementById('blockButton');
    const tableButton = document.getElementById('tableButton');

    if (currentView === 'block') {
        blockButton.style.color = '#3498db';
        tableButton.style.color = 'black';
    } else if (currentView === 'table') {
        blockButton.style.color = 'black';
        tableButton.style.color = '#3498db';}
}

function showEditTaskModal(index) {
    selectedTaskIndex = index;

    const editTaskModal = document.getElementById('editTaskModal');
    editTaskModal.style.display = 'block';

    const task = tasks[index];
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editTime').value = task.time;
    document.getElementById('editDate').value = task.date;
}

function closeEditTaskModal() {
    document.getElementById('editTaskModal').style.display = 'none';
    selectedTaskIndex = null;
}

function editTask() {
    if (selectedTaskIndex !== null) {
        tasks[selectedTaskIndex].title = document.getElementById('editTitle').value;
        tasks[selectedTaskIndex].description = document.getElementById('editDescription').value;
        tasks[selectedTaskIndex].time = document.getElementById('editTime').value;
        tasks[selectedTaskIndex].date = document.getElementById('editDate').value;

        displayTasks();
        closeEditTaskModal();
    }
}

function deleteTask() {
    if (selectedTaskIndex !== null) {
        tasks.splice(selectedTaskIndex, 1);
        displayTasks();
        closeEditTaskModal();
    }
}

window.onclick = function (event) {
    const editTaskModal = document.getElementById('editTaskModal');
    if (event.target === editTaskModal) {
        closeEditTaskModal();
    }
};  

function searchByTitle() {
    const searchInput = document.getElementById('searchTitle');
    const searchValue = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchValue));

    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    if (filteredTasks.length > 0) {
        filteredTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            tasksContainer.appendChild(taskElement);
        });
    } else {
        tasksContainer.innerHTML = '<p>Ничего не найдено</p>';
    }
}