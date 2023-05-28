// Find elements on the page
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Add a task
form.addEventListener("submit", addTask);

// Delete a task
tasksList.addEventListener("click", deleteTask);

// Complete a task
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();

  // get text from input
  const taskText = taskInput.value;

  // make a todo object
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // add task to tasks array
  tasks.push(newTask);

  // then store it in localStorage
  saveToLocalStorage();

  renderTask(newTask);

  // finally clear the input box value and return focus on it
  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
}

function deleteTask(event) {
  // Check if that is not a Delete button
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");

  // Check task ID
  const id = Number(parentNode.id);

  // Delete task
  tasks = tasks.filter((task) => task.id !== id);

  // store it in LocalStorage
  saveToLocalStorage();

  parentNode.remove();

  checkEmptyList();
}

function doneTask(event) {
  // Check if that is not a Complete button
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  // Check task ID
  const id = Number(parentNode.id);

  // const task = tasks.find((task) => task.id === id)

  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });

  task.done = !task.done;

  // Store this to LocalStorage
  saveToLocalStorage();

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
  // }

  // saveHTMLtoLocalStorage();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

// function to save tasks to localStorage
function saveToLocalStorage() {
  // convert the array to string then store it
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // render them to screen
  // renderTask(task);
}

// function to render given task to screen
function renderTask(task) {
  // Create CSS
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  // make a <li> element and fill it
  const taskHTML = `
  <li id="${task.id}" class="list-group-item d-flex">
          <span class="${cssClass}">${task.text}</span>
          <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18" />
            </button>
            <button type="button" data-action="delete" class="btn-action">
              <img
                src="./img/cross.svg"
                alt="Delete"
                width="18"
                height="18"
              />
            </button>
          </div>
        </li>`;

  //  Add a task on the page
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);
}
