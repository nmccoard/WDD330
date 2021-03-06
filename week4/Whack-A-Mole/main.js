const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highSB = document.querySelector('.highS');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let highScore = loadHighScore();

function randomTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

// this is just a random DOM selector
function randomHole(holes) {
   //console.log(holes.length);
   const idx = Math.floor(Math.random() * holes.length);
   const hole = holes[idx];
   if (hole === lastHole) {
      console.log('Ah nah that the same hole')
      return randomHole(holes);
   }
   //console.log(hole);
   lastHole = hole;
   return hole;
}

function peek() {
   const time = randomTime(200, 1000);
   const hole = randomHole(holes);
   //console.log(time, hole);
   hole.classList.add('up');
   setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peek();
   }, time);
}

function startGame() {
   scoreBoard.textContent = 0;
   timeUp = false;
   score = 0;
   peek();
   setTimeout(() => {
      timeUp = true;
      gameOver()
   }, 10000) // 1 sec = 1000.
}

function hit(e) {
   //console.log(e);
   if (!e.isTrusted) return;
   score++;
   this.classList.remove('up');
   scoreBoard.textContent = score;
   if(score > highScore){
      highScore = score;
      highSB.textContent = highScore;
   }
}

function gameOver() {
   console.log("Game is over")
   localStorage.setItem("whackAmole", highScore);
}

function loadHighScore() {
   let savedScore = localStorage.getItem("whackAmole");
   if (savedScore != null) {
      highSB.textContent = savedScore;
      return savedScore;
   } else {
      return 0;
   }
}

moles.forEach(mole => mole.addEventListener('click', hit));
