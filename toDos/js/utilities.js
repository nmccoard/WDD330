export function tasksLeft(list) {
   let count = 0;
   list.forEach(item => {
      if (item != undefined && item.completed === false) {
         count++;
      }
   });
   if (count === 1) {
      document.querySelector("#tasksLeft").innerHTML = `${count} Task Left`;
   } else {
      document.querySelector("#tasksLeft").innerHTML = `${count} Tasks Left`;
   }
}

export function filterCompleted(list) {
   let numTasks = 0;
   for (let i = 0; i < list.length; i++) {
      if (list[i] != undefined) {
         if (list[i].completed === false) {
            document.querySelectorAll(".item")[i].classList.add("hidden");
         } else {
            document.querySelectorAll(".item")[i].classList.remove("hidden");
            numTasks++;
         }
      }
   }
   document.querySelector("#tasksLeft").innerHTML = `${numTasks} Completed`;
}

export function filterActive(list) {
   for (let i = 0; i < list.length; i++) {
      if (list[i] != undefined) {
         if (list[i].completed === true) {
            document.querySelectorAll(".item")[i].classList.add("hidden");
         } else {
            document.querySelectorAll(".item")[i].classList.remove("hidden");
         }
      }
   }
   tasksLeft(list);
}

export function filterAll(list) {
   const itemList = document.querySelectorAll(".item");
   let i = 0;
   itemList.forEach(item => {
      document.querySelectorAll(".item")[i].classList.remove("hidden");
      i++
   });
   tasksLeft(list);
}