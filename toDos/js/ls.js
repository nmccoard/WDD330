export function saveList(fileName, list) {
   const toBeSaved = JSON.stringify(list);
   localStorage.setItem(fileName, toBeSaved);
}

export function loadList(fileName) {
   let savedList = JSON.parse(localStorage.getItem(fileName));
   if (savedList != null) {
      return savedList;
   } else {
      return [];
   }
}
