

function createList(){
   // our arry that will need to updated each week
   const links = [
      {
         label: "Week 1 Notes",
         url: "week1/index.html"
      },
      {
      label: "Week 2 Notes",
         url :"week2/index.html"
      }
   ]

   var ol = document.querySelector("ol");

   // a for loop to go through our list and assign the contents to new li elements
   for (i = 0 ; i < links.length ; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");

      a.href = links[i].url;
      a.innerText = links[i].label;

      ol.appendChild(li);
      li.appendChild(a);
  }
}