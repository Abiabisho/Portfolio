// Set Today's Date
const dateDisplay = document.getElementById('current-date');
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString('en-US', options);

// Load data from LocalStorage
let tasks = JSON.parse(localStorage.getItem('pro_todo_data')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() === "") return;

    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

    const newTask = {
        id: Date.now(),
        text: input.value,
        completed: false,
        time: timeStr
    };

    tasks.push(newTask);
    input.value = '';
    render();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    render();
}

function render() {
    localStorage.setItem('pro_todo_data', JSON.stringify(tasks));
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    let pending = 0;
    let finished = 0;

    tasks.forEach(t => {
        if (t.completed) finished++; else pending++;

        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
                    <div class="checkbox ${t.completed ? 'checked' : ''}" onclick="toggleTask(${t.id})"></div>
                    <div class="task-content">
                        <span class="task-text ${t.completed ? 'done' : ''}">${t.text}</span>
                        <span class="task-time">Added at ${t.time}</span>
                    </div>
                    <button class="btn-delete" onclick="deleteTask(${t.id})">&times;</button>
                `;
        list.appendChild(li);
    });

    document.getElementById('pending-stat').innerText = `${pending} Tasks Left`;
    document.getElementById('done-stat').innerText = `${finished} Completed`;
}

// Allow 'Enter' key to add tasks
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

render();