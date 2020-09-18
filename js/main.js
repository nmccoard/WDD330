/*********************
 * Create List
 *   Adds a new list items (li) with an anchor tags (a) to an unordered list (ul) found on the HTML page.
 ********************/
function createList(){
   // This array will need to updated each week with the new content for that week
   const links = [
      {
         label: "Week 1 Notes",
         url: "week1/index.html"
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