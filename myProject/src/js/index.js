const inputTasks = document.getElementById('input-tasks');
const addItemBtn = document.getElementById('add-item');
const todoList = document.getElementById('todo-list');
const completedTasksContainer = document.getElementById('completed-tasks');
const getCompletedBtn = document.getElementById('get-completed');
const getPendingBtn = document.getElementById('get-pending');



// Function to create a new task element
function createNewTask(taskText) {
    const newTask = document.createElement('div');
    newTask.classList.add('todolist-items'); // Add the class for task items

    const taskName = document.createElement('h3');
    taskName.textContent = taskText;
    newTask.appendChild(taskName);

    const markDoneBtn = document.createElement('div');
    markDoneBtn.classList.add('secondary-button', 'tooltip-btn');
    markDoneBtn.setAttribute('data-tooltip', 'Mark done');

    const markDoneIcon = document.createElement('i');
    markDoneIcon.classList.add('fa-solid', 'fa-square-check', 'icon');
    markDoneBtn.appendChild(markDoneIcon);

    markDoneBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up
        markTaskAsDone(newTask); // Mark the task as done
    });

    newTask.appendChild(markDoneBtn);
    todoList.appendChild(newTask);

    saveTaskToLocalStorage(taskText); // Save the task to local storage
}

// the "Add to list" button
addItemBtn.addEventListener('click', function() {
    const taskText = inputTasks.value.trim();

    if (taskText !== '') {
        createNewTask(taskText);
        inputTasks.value = '';
    }
});

//"Get completed tasks" button
getCompletedBtn.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll('.todolist-items.completed-task');   
    todoList.innerHTML = '';

    completedTasks.forEach(task => {
        todoList.appendChild(task.cloneNode(true));
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const deleteAllBtn = document.getElementById('delete-all');

    deleteAllBtn.addEventListener('click', function() {
        todoList.innerHTML = ''; 
    });
});

// mark a task as done
function markTaskAsDone(taskElement) {
    taskElement.classList.toggle('completed-task');
  
}


// for the "Get Pending Tasks" button
getPendingBtn.addEventListener('click', function() {
    const allTasks = document.querySelectorAll('.todolist-items');

    allTasks.forEach(task => {
        if (task.classList.contains('completed-task')) {
            task.style.display = 'none'; 
        } else {
            task.style.display = 'block'; 
        }
    });
});



// aving task to local storage
function saveTaskToLocalStorage(task) {
    
}
