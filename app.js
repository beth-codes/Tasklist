// DEFINING VARIABLES
const taskForm = document.querySelector('#task-form');
const newTask = document.querySelector('#new-task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks')

// LOAD ALL EVENT LISTENERS
loadEventListeners();

// LOAD ALL EVENT LISTENER
//DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', getTasks);

function loadEventListeners() {  //we put the event in d loadEventListener bracket and call the function blow. Note each functions has different bracket below.

  // ADD TASK EVENT
  taskForm.addEventListener('submit', addTask);

  //REMOVE TASK EVENT
  taskList.addEventListener('click', removeTask);

  //CLEAR BTN EVENT
  clearTask.addEventListener('click', clearBtn);

  //FILTER TASK EVENT
  filter.addEventListener('keyup', filterTasks);
}

//GET TASKS FROM LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //CREATE LI ELEMENT
    const li = document.createElement('li');

    //ADD CLASSNAME
    li.className = 'collection-item';

    //CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(task));

    //CREATE NEW LINK ELEMENT
    const link = document.createElement('a');
    link.className = 'delete-item'

    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

    //APPEND THE LINK TO LI
    li.appendChild(link);

    //APPEND LI TO UL
    taskList.appendChild(li);

  });
}

// ADD TASK
function addTask(e) {
  if (newTask.value === '' && link.value === '') {
    alert('Add a task');
  }

  //CREATE LI ELEMENT
  const li = document.createElement('li');

  //ADD CLASSNAME
  li.className = 'collection-item';

  //CREATE TEXT NODE AND APPEND TO LI
  li.appendChild(document.createTextNode(newTask.value));

  //CREATE NEW LINK ELEMENT
  const link = document.createElement('a');
  link.className = 'delete-item'

  // ADD ICON HTML
  link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

  //APPEND THE LINK TO LI
  li.appendChild(link);

  //APPEND LI TO UL
  taskList.appendChild(li);

  //STORE IN LOCAL STORAGE (LS)
  storeTaskInLocalStorage(newTask.value);

  //CLEAR INPUT
  newTask.value = '';

  e.preventDefault();
}

//STORE TASK
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //REMOVE FROM LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  } 
}

//REMOVE FROM LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR BTN
function clearBtn() {
  // taskList.innerHTML = '';

  //faster and better
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //CLEAR FROM LS
  clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


//FILTER TASK.. how to create filter
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}
