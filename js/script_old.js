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

// Добавление задачи
form = document.addEventListener("submit", addTask);

// Удаление задачи
tasksList.addEventListener("click", deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  // Отменяем отправку формы
  event.preventDefault();

  // Достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  // Описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // Добавляем задачу в массив с задачами
  tasks.push(newTask);

  // Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  renderTask(newTask);

  // Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
}

function deleteTask(event) {
    // Проверяем если клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== "delete") return;
  
    // Проверяем что клик был по кнопке "удалить задачу"
    if (event.target.dataset.action === "delete") {
        console.log('Hello!');
    }
    const parentNode = event.target.closest(".list-group-item");
  
    // Определяем ID задачи
    const id = Number(parentNode.id);
  
    // Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) =>  task.id === id);
  
    // Удаляем задачу из массива с задачами
    // tasks.splice(index, 1);
  
    // Удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id);
  
    // Сохраняем список задач в хранишище браузера LocalStorage
    saveToLocalStorage();
  
    // Удаляем задачу из разметки
    parentNode.remove();
  
    checkEmptyList();
  
    // Проверка. Если в списке задач 1 элемент, показываем блок "Список дел пуст"
    // if (tasksList.children.length === 1) {
    //   emptyList.classList.remove("none");
    // }
    // }
  
    // saveHTMLtoLocalStorage();
  }

function doneTask(event) {
  // Проверяем, что клик был НЕ по кнопке "Done"
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  // Определяем ID задачи
  const id = Number(parentNode.id);

  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });

  task.done = !task.done;

  // Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  // Add a "checked" symbol when clicking on a list item
  // var list = document.querySelector('ul');
  // list.addEventListener('click', function(ev) {
  //     if (ev.target.tagName === 'LI'){
  //         ev.target.classList.toggle('checked');
  //     }
  // }, false);
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
        <div class="empty-list__title">Список дел пуст</div>
      </li>`;
      tasksList.insertAdjacentHTML('afterbegin', emptyHTML);      
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Рендерим задачу на страницу
function renderTask(task) {
  // Формируем CSS класс
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  // Формируем разметку для новой задачи
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
    </li>
    `;

  // Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);
}

// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName('li');
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//     var span = document.createElement('span');
//     var txt = document.createTextNode('\u00D7');
//     span.className = "close";
//     span.appendChild(txt);
//     myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
// var close = document.getElementsByClassName('close');
// var i;
// for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//         var div = this.parentElement;
//         div.style.display = 'none';
//     }
// }

// Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI'){
//         ev.target.classList.toggle('checked');
//     }
// }, false);

// Create a new list item when clicking on the "Add" button
// function newElement() {
//     var li = document.createElement('li');
//     var inputValue = document.getElementById('taskInput').value;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     if (inputValue === '') {
//         alert("You must write something!");
//     } else {
//         document.getElementById('tasksList').appendChild(li);
//     }
//     document.getElementById('taskInput').value = '';

//     var span = document.createElement('SPAN');
//     var txt = document.createTextNode('\u00D7');
//     span.className = 'close';
//     span.appendChild(txt);
//     li.appendChild(span);

//     for (i = 0; i < close.length; i++) {
//         close[i].onclick = function() {
//             var div = this.parentElement;
//             div.style.display = 'none';
//         }
//     }
// }
