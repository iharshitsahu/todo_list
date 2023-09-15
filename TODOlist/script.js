document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        
        // Create a new task item
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;
        
        // Add the task to the list
        taskList.appendChild(taskItem);
        
        // Clear the input field
        taskInput.value = "";
        
        // Save tasks to local storage
        saveTasks();
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    
    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    // Store each task text
    taskList.querySelectorAll("li").forEach((taskItem) => {
        const taskText = taskItem.querySelector("span").textContent;
        tasks.push(taskText);
    });

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((taskText) => {
        // Create a new task item
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;

        // Add the task to the list
        taskList.appendChild(taskItem);
    });
}
