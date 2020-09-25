//alert('Welcome to Quiz Ninja');
document.getElementById("messageArea").innerHTML = "Click the button<br>to start the game";
document.getElementById("myButton").addEventListener("click", quizTime);

function quizTime() {
   const quiz = [
      ["What is Superman's real name?", "Clark Kent"],
      ["What is Wonder Woman's real name?", "Diana Prince"],
      ["What is Batman's real name?", "Bruce Wayne"]
   ];

   let score = 0

   // Game loop
   for (const [question, answer] of quiz) {
      const response = ask(question);
      check(response, answer);
   }
   // Call Game Over after asking all the questions
   gameOver(score);
}

   function ask(question) {
      return prompt(question);
   }

   function check(response, answer) {
      if (response === answer) {
         alert('Correct!');
         score++;
      } else {
         alert(`Wrong! The correct answer was ${answer}`);
      }
   }

   function gameOver(score) {
      alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
   }