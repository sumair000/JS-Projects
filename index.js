class Player {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.score = 0;
      this.turn = false;
    }
  
    updateScore(roll) {
      this.score += roll;
    }
  
    setTurn(turn) {
      this.turn = turn;
    }
  
    reset() {
      this.score = 0;
      this.turn = false;
    }
  }
  
  const person1 = new Player(1, "Player 1");
  const person2 = new Player(2, "Player 2");
  let currentPlayer = null;
  
  document.getElementById("startButton").addEventListener("click", startGame);
  
  function startGame() {
    document.getElementById("startButton").disabled = true;
    currentPlayer = Math.random() <= 0.5 ? person1 : person2;
    displayTurnMessage(currentPlayer);
    document.getElementById("rollDice").addEventListener("click", rollDice);
  }
  
  function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    document.getElementById(`dice-img${currentPlayer.id}`).src = `images/${roll}.svg`;
    
    currentPlayer.updateScore(roll);
    document.getElementById(`player${currentPlayer.id}message`).innerHTML = `Score: ${currentPlayer.score}`;
  
    if (roll === 1) {
      switchTurn();
    } else {
      checkWinner();
    }
  }
  
  function switchTurn() {
    currentPlayer.setTurn(true);
    currentPlayer = currentPlayer === person1 ? person2 : person1;
    displayTurnMessage(currentPlayer);
  }
  
  function displayTurnMessage(player) {
    document.getElementById("player1message").innerHTML = player === person1 ? "Player 1's turn" : "";
    document.getElementById("player2message").innerHTML = player === person2 ? "Player 2's turn" : "";
  }
  
  function checkWinner() {
    if (person1.turn && person2.turn) {
      if (person1.score > person2.score) {
        document.getElementById('p1-won').innerHTML = "PLAYER 1 WON!...😎";
      } else if (person1.score < person2.score) {
        document.getElementById('p2-won').innerHTML = "PLAYER 2 WON!...😎";
      } else {
        alert("MATCH DRAW...");
      }
    }
  }
  
  console.log(person1, person2);
  