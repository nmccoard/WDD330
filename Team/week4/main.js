const game = {

   playersTurn: 1,
   totalTurns: 0,
   selectedSquare: document.querySelectorAll("#gameBoard > div"),
   resetButton: document.getElementById("reset"),
   playerOne: ['', '', '', '', '', '', '', '', ''],
   playerTwo: ['', '', '', '', '', '', '', '', ''],
   winningBoards: [
      ['w', 'w', 'w', '', '', '', '', '', ''],
      ['', '', '', 'w', 'w', 'w', '', '', ''],
      ['', '', '', '', '', '', 'w', 'w', 'w'],
      ['w', '', '', 'w', '', '', 'w', '', ''],
      ['', 'w', '', '', 'w', '', '', 'w', ''],
      ['', '', 'w', '', '', 'w', '', '', 'w'],
      ['w', '', '', '', 'w', '', '', '', 'w'],
      ['', '', 'w', '', 'w', '', 'w', '', '']
   ]

}

game.selectedSquare.forEach(square => {
   square.addEventListener('click', () => {

      if (game.playersTurn === 1 && square.innerHTML === "") {
         square.innerHTML = "X";
         game.playersTurn = 2;
         game.playerOne[square.id] = 'w';
         document.getElementById("playerTurn").innerHTML = "Second Player";
         if (checkWin(game.playerOne)) {
            console.log("Player 1 won")
            winner("First");
         }
         game.totalTurns++;
      } else if (game.playersTurn === 2 && square.innerHTML === "") {
         square.innerHTML = "O";
         game.playersTurn = 1;
         game.playerTwo[square.id] = 'w';
         document.getElementById("playerTurn").innerHTML = "First Player";
         let win = checkWin(game.playerTwo);
         if (checkWin(game.playerTwo)) {
            winner("Second");
         }
         game.totalTurns++;
      }

      if (game.totalTurns > 9) {
         isTie();
      }
   });
});

game.resetButton.addEventListener('click', () => {
   game.totalTurns = 0;
   game.playersTurn = 1;
   document.getElementById("playerTurn").innerHTML = "First Player";
   game.selectedSquare.forEach(square => {
      square.innerHTML = "";
   });

   game.playerOne = ['', '', '', '', '', '', '', '', ''];
   game.playerTwo = ['', '', '', '', '', '', '', '', ''];

})

function checkWin(playerBoard) {
   let win = false;
   game.winningBoards.forEach(board => {
      for (let i = 0; i < 8; i++) {
         let spots = 0;

         for (let j = 0; j < 9; j++) {
            if (board[j] === "w" && playerBoard[j] === "w") {
               spots++;
            }
         }

         if (spots === 3) {
            console.log("we found a winner")
            win = true;
            return;
         }
      }

   })
   console.log(win);
   return win;
};

function winner(player) {
   console.log("Winner is checking in");
   document.getElementById("playerTurn").innerHTML = `${player} Player is the Winner`;
   game.playersTurn = 3;

}

function isTie(playerBoard) {
   document.getElementById("playerTurn").innerHTML = `The game is a Tie`;
   game.playersTurn = 3;
}
