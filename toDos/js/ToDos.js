/****************************
 * CLASSES
 ****************************/
export default class ToDo {
   constructor(content) {
      this.id = Date.now();
      this.content = content;
      this.completed = false;
   }
}

