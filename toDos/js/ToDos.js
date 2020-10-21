/****************************
 * CLASSES
 ****************************/
class toDo {
   constructor(content) {
      this.id = Date.now();
      this.content = content;
      this.completed = false;
   }
}

/******************************
 * Global Variables
 ******************************/
const newBtn = document.querySelector("#newTaskBtn");
const taskInput = document.querySelector("#inputField");
const allBtn = document.querySelectorAll(".btn")[0];
const activeBtn = document.querySelectorAll(".btn")[1];
const completedBtn = document.querySelectorAll(".btn")[2];
const toDoList = [];

/******************************
 * FUNCTIONS
 *****************************/
function addNewTask() {
   let task = document.querySelector('#inputField').value;
   const newTask = new toDo(task);
   toDoList.push(newTask);
   console.log(toDoList);
   displayTask(newTask);
   document.querySelector('#inputField').value = "";
   tasksLeft();
   saveTasks();
}

function addTask(task) {
   toDoList.push(task);
   displayTask(task);
   tasksLeft();
}

function displayTask(task) {
   // create the new item div
   let itemDiv = document.createElement("div");
   itemDiv.className = "item";
   // create tje new checkbox
   let checkBox = document.createElement("input");
   checkBox.type = "checkbox";
   checkBox.id = `checkbox${toDoList.length - 1}`;
   // adding a on change event listener
   checkBox.onchange = () => {
      toggleComplete(task)
   };
   // mark the checkbox if completed is true
   if (task.completed === true) {
      checkBox.checked = true;
   }
   // create the new label for the checkbox (this text we see for the tasks)
   let itemLabel = document.createElement("label");
   itemLabel.htmlFor = `checkbox${toDoList.length - 1}`;
   itemLabel.appendChild(document.createTextNode(task.content));
   // create a new remove button
   let removeBTN = document.createElement("input");
   removeBTN.type = "button";
   removeBTN.className = "removeBtn";
   removeBTN.value = "X";
   removeBTN.id = `${toDoList.length - 1}`;
   // adding the event listener
   removeBTN.onclick = () => {
      removeTask(event)
   };

   //add them all to the toDoList div in the right order
   document.querySelector('#itemList').appendChild(itemDiv);
   itemDiv.appendChild(checkBox)
   itemDiv.appendChild(itemLabel);
   itemDiv.appendChild(removeBTN);
}

function tasksLeft() {
   let count = 0;
   for (item of toDoList) {
      if (item != undefined && item.completed === false) {
         count++;
      }
   }
   if (count === 1) {
      document.querySelector("#tasksLeft").innerHTML = `${count} Task Left`;
   } else {
      document.querySelector("#tasksLeft").innerHTML = `${count} Tasks Left`;
   }
}

function toggleComplete(task) {
   console.log("toggle fired");
   if (task.completed === false) {
      task.completed = true;
   } else {
      task.completed = false;
   }
   tasksLeft();
   saveTasks();
}

function removeTask(e) {
   const itemToBeRemoved = e.target.id
   console.log(`Item ${itemToBeRemoved} called Remove`);
   document.querySelectorAll(".item")[itemToBeRemoved].style.display = "none";
   delete toDoList[itemToBeRemoved];
   tasksLeft();
   saveTasks();
}

function loadSavedTasks() {
   let savedTasks = JSON.parse(localStorage.getItem("toDoTasks"));
   console.log("Array form storage");
   console.log(savedTasks);
   if (savedTasks != null) {
      for (item of savedTasks) {
         if (item) {
            addTask(item);
         }
      }
   }
   console.log("toDoList");
   console.log(toDoList);
}

function saveTasks() {
   const toBeSaved = JSON.stringify(toDoList);
   localStorage.setItem("toDoTasks", toBeSaved);
   console.log("saved the To Do List");
}

function filterCompleted() {
   //let completedList = toDoList.filter(item => item.completed === true);
   //console.log(completedList);
   let i = 0;
   let xItems = 0;
   for (task of toDoList) {
      if (task != undefined) {
         if (task.completed === false) {
            document.querySelectorAll(".item")[i].classList.add("hidden");
         } else {
            document.querySelectorAll(".item")[i].classList.remove("hidden");
            xItems++;
         }
      }
      i++
   }
   document.querySelector("#tasksLeft").innerHTML = `${xItems} Completed`;
}

function filterActive() {
   //let activeList = toDoList.filter(item => item.completed === false);
   //console.log(activeList);
   let i = 0;
   for (task of toDoList) {
      if (task != undefined) {
         if (task.completed === true) {
            document.querySelectorAll(".item")[i].classList.add("hidden");
         } else {
            document.querySelectorAll(".item")[i].classList.remove("hidden");
         }
      }
      i++
   }
   tasksLeft();
}

function filterAll() {
   const itemList = document.querySelectorAll(".item");
   let i = 0;
   for (item of itemList) {
      document.querySelectorAll(".item")[i].classList.remove("hidden");
      i++
   }
   tasksLeft();
}

/*****************************
 * Event Listeners
 *****************************/
newBtn.addEventListener('click', addNewTask);

taskInput.addEventListener('keyup', (e) => {
   if (e.keyCode === 13) {
      e.preventDefault();
      addNewTask();
   }
});

allBtn.addEventListener('click', filterAll);
activeBtn.addEventListener('click', filterActive);
completedBtn.addEventListener('click', filterCompleted);

window.onload = loadSavedTasks();
