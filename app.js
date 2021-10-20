// DEFINE UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// ----------- Load all eventlisteners - define ---------------
function loadEventListeners() {
    // DOM Load vent - this is an auto event listener that starts once dom content get loaded
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear all the task event
    clearBtn.addEventListener('click', clearTasks);
    // filter taasks event
    filter.addEventListener('keyup', filterTasks);
}

// get task from localStorage - event call back function
function getTasks(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create textnode and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // add icon html as this link
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// add task event call back function
function addTask(e) {
    e.preventDefault();

    if(taskInput.value === '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html as this link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // clear the input
    taskInput.value = '';
}

// store task in local storage 
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task - event bubbling concept has been used
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all the task - event callback function
function clearTasks(e) {
    // taskList.innerHTML = '';

    // above innerHTML logic is enough but below line of removeChild logic is faster than above
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from localStorage
    clearTasksFromLocalStorage();
}

// clear tasks from localStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks - event call back function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// ------------ Load all event listeners - call -------------
loadEventListeners();