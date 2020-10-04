//alert('Welcome to Quiz Ninja');
//document.getElementById("myButton").addEventListener("click", quizTime);

const view = {
   score: document.querySelector('#score strong'),
   question: document.getElementById('question'),
   result: document.getElementById('result'),
   info: document.getElementById('info'),
   start: document.getElementById('start'),
   render(target, content, attributes) {
      for (const key in attributes) {
         target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
   },
   show(element){
      element.style.display = 'block';
      },
   hide(element){
      element.style.display = 'none';
      }
};

const quiz = [{
      name: "Superman",
      realName: "Clark Kent"
   },
   {
      name: "Wonder Woman",
      realName: "Diana Prince"
   },
   {
      name: "Batman",
      realName: "Bruce Wayne"
   },
   {
      name: "Aquaman",
      realName: "Arthur Curry"
   }
];


const game = {
   start(quiz) {
      this.questions = [...quiz];
      this.score = 0;
      view.hide(view.start);

      // Game loop
      for (const question of this.questions) {
         this.question = question;
         this.ask();
      }
      // Call Game Over after asking all the questions
      this.gameOver();
   },

   ask() {
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
      const response = prompt(question);
      this.check(response);
   },

   check(response) {
      const answer = this.question.realName;
      if (response === answer) {
         view.render(view.result, 'Correct!', {
            'class': 'correct'
         });
         this.score++;
         view.render(view.score, this.score);
      } else {
         view.render(view.result, `Wrong! The correct answer was ${answer}`, {
            'class': 'wrong'
         });
         alert(`Wrong! The correct answer was ${answer}`);
      }
   },

   gameOver() {
      view.render(view.info, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
      view.show(view.start);
   }
}

view.start.addEventListener('click', () => game.start(quiz), false);