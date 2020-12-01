/*********************
 * Create List
 *   Adds a new list items (li) with an anchor tags (a) to an unordered list (ul) found on the HTML page.
 ********************/
function createList(){
   // This array will need to updated each week with the new content for that week
   const links = [
      {
         label: "Week 1 Notes",
         url: "week1/"
      },
      {
         label: "Week 2 Notes", 
         url: "week2/"
      },
      {
         label: "Week 3 Notes", 
         url: "week3/"
      },
      {
         label: "Week 4 Notes", 
         url: "week4/"
      },
      {
         label: "Week 5 Notes", 
         url: "week5/"
      },
      {
         label: "Week 6 Challenge: Todo App", 
         url: "toDos/"
      },
      {
         label: "Week 7 Notes", 
         url: "week7/"
      },
      {
         label: "Week 8 Notes", 
         url: "week8/"
      },
      {
         label: "Week 9 Notes", 
         url: "week9/"
      },
      {
         label: "Week 10 Notes", 
         url: "week10/"
      },
      {
         label: "Week 11 Notes", 
         url: "week11/"
      }
   ]

   let list = document.querySelector("ul");

   // this for loop to go through our list and assign the contents to new li elements and anchor tags
   for (i = 0 ; i < links.length ; i++) {
      let listItem = document.createElement("li");
      let ref = document.createElement("a");

      ref.href = links[i].url;
      ref.innerText = links[i].label;

      list.appendChild(listItem);
      listItem.appendChild(ref);
  }
}