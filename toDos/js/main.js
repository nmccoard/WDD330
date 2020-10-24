/*****************************
 * IMPORTS
 ****************************/
import ToDo from './ToDos.js';
import { saveList, loadList } from './ls.js';
import * as utility from './utilities.js';

/******************************
 * Global Variables
 ******************************/
const newBtn = document.querySelector("#newTaskBtn");
const taskInput = document.querySelector("#inputField");
const allBtn = document.querySelectorAll(".btn")[0];
const activeBtn = document.querySelectorAll(".btn")[1];
const completedBtn = document.querySelectorAll(".btn")[2];
const toDoList = [];
const fileName = "toDoTasks";

/******************************
 * FUNCTIONS
 *****************************/
function addNewTask() {
   let task = document.querySelector('#inputField').value;
   const newTask = new ToDo(task);
   toDoList.push(newTask);
   displayTask(newTask);
   document.querySelector('#inputField').value = "";
   utility.tasksLeft(toDoList);
   saveList(fileName, toDoList);
}

function displayTask(task) {
   // create the new item div
   let itemDiv = document.createElement("div");
   itemDiv.className = "item";
   // create the new checkbox
   let checkBox = document.createElement("input");
   checkBox.type = "checkbox";
   checkBox.id = `checkbox${toDoList.length - 1}`;
   // check the checkbox if completed is true
   if (task.completed === true) {
      checkBox.checked = true;
   }
   // create the new label for the checkbox (the text we see for the tasks)
   let itemLabel = document.createElement("label");
   itemLabel.htmlFor = `checkbox${toDoList.length - 1}`;
   itemLabel.appendChild(document.createTextNode(task.content));
   // create a remove button for the task
   let removeBTN = document.createElement("input");
   removeBTN.type = "button";
   removeBTN.className = "removeBtn";
   removeBTN.value = "X";
   removeBTN.id = `${toDoList.length - 1}`;
   // add them all to the itemList div. Make sure it is in the right order
   document.querySelector('#itemList').appendChild(itemDiv);
   itemDiv.appendChild(checkBox)
   itemDiv.appendChild(itemLabel);
   itemDiv.appendChild(removeBTN);
   // add the event listeners
   checkBox.addEventListener('change', () => toggleComplete(task));
   removeBTN.addEventListener('click', () => removeTask(removeBTN.id));
}

function toggleComplete(task) {
   if (task.completed === false) {
      task.completed = true;
   } else {
      task.completed = false;
   }
   utility.tasksLeft(toDoList);
   saveList(fileName, toDoList);
}

function removeTask(position) {
   document.querySelectorAll(".item")[position].style.display = "none";
   delete toDoList[position];
   utility.tasksLeft(toDoList);
   saveList(fileName, toDoList);
}

function loadSavedTasks() {
   let savedTasks = loadList(fileName);
   savedTasks.forEach(item => {
      if (item) {
         // turn the saved tasks back into toDo objects
         item = Object.assign(new ToDo, item);
         toDoList.push(item);
         displayTask(item);
         utility.tasksLeft(toDoList);
      }
   });
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

allBtn.addEventListener('click', () => utility.filterAll(toDoList));
activeBtn.addEventListener('click', () => utility.filterActive(toDoList));
completedBtn.addEventListener('click', () => utility.filterCompleted(toDoList));

window.onload = loadSavedTasks();
