

// Sample users (stored locally for this example)
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

// Initialize tasks if not already in localStorage
if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([]));
}

// Function to display tasks
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
            <span contenteditable="true" onblur="editTask(${task.id}, this.innerText)">${task.description}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a task
document.getElementById('add-task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            id: tasks.length + 1,
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
});

// Function to edit a task
function editTask(id, description) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.description = description;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to toggle task completion
function toggleTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Login functionality
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
        displayTasks();
    } else {
        document.getElementById('login-error').innerText = 'Invalid username or password';
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('todo-section').style.display = 'none';
});

// On page load, check if a user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
        displayTasks();
    } else {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('todo-section').style.display = 'none';
    }
});