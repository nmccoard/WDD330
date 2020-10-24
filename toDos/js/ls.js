export function saveList(fileName, listName) {
   const toBeSaved = JSON.stringify(listName);
   localStorage.setItem(fileName, toBeSaved);
   console.log("saved the list");
}

export function loadList(fileName){
   let savedList = JSON.parse(localStorage.getItem(fileName));
   if (savedList != null){
      return savedList;
   } else {
      return [];
   }
}

