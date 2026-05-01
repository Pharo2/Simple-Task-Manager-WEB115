let tasks = [];
let nextId = 1;

const form = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const prioritySelect = document.getElementById("taskPriority");
const importantCheckbox = document.getElementById("taskImportant");
const completedCheckbox = document.getElementById("taskCompleted");
const taskManager = document.getElementById("taskmanager");

// submit the form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskNameInput.value.trim();

    if (name === "") {
        alert("Please enter a task name.");
        return;
    }

    const newTask = {
        id: nextId,
        name: name,
        priority: prioritySelect.value,
        isImportant: importantCheckbox.checked,
        isCompleted: completedCheckbox.checked,
        date: new Date().toLocaleDateString()
    };

    tasks.push(newTask);
    nextId++;

    console.log(JSON.stringify(tasks));

    displayTasks();
    form.reset();
});

// display tasks in the task manager
function displayTasks() {
    if (tasks.length === 0) {
        taskManager.innerHTML = "<p>No tasks yet.</p>";
        return;
    }

    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        html += `
            <div class="task" id="task-${task.id}">
                <strong class="task-name">${task.name}</strong>
                <div class="task-info">
                    Priority: ${task.priority} | Added: ${task.date}
                    ${task.isImportant ? " | Important" : ""}
                    ${task.isCompleted ? " | Completed" : ""}
                </div>
                <button onclick="toggleComplete(${task.id})">Toggle Done</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
    }

    taskManager.innerHTML = html;

    // apply styling to all tasks
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskDiv = document.getElementById("task-" + task.id);
        const taskName = taskDiv.querySelector(".task-name");

        // highlight important tasks in red
        if (task.isImportant) {
            taskDiv.style.backgroundColor = "#ffe6e6";
            taskName.style.color = "red";
        }

        // apply strikethrough to completed tasks
        if (task.isCompleted) {
            taskName.style.textDecoration = "line-through";
        }

        // set border color based on priority
        if (task.priority === "High") {
            taskDiv.style.borderLeftColor = "red";
        } else if (task.priority === "Medium") {
            taskDiv.style.borderLeftColor = "orange";
        } else {
            taskDiv.style.borderLeftColor = "green";
        }
    }
}

// toggle task completion status
function toggleComplete(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].isCompleted = !tasks[i].isCompleted;
            break;
        }
    }
    console.log(JSON.stringify(tasks));
    displayTasks();
}

// delete task functionality
function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }
    console.log(JSON.stringify(tasks));
    displayTasks();
}

// display tasks on page load
displayTasks();
