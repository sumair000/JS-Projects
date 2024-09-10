let playerOneScore = 0;
let playerTwoScore = 0;

let player = false;

document.getElementById("startButton").addEventListener("click", toss);

function toss() {
  document.getElementById("startButton").disabled = true;
  const turn = Math.random();
  if (turn <= 0.5) {
    document
      .getElementById("player1Button")
      .addEventListener("click", playerOne);
    document.getElementById("player1message").innerHTML = "player 1's turn";
  } else {
    document
      .getElementById("player2Button")
      .addEventListener("click", playerTwo);
    document.getElementById("player2message").innerHTML = "Player 2's turn";
  }
}

function playerOne() {
  let rollDice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-img1").src = `images/${rollDice}.svg`;
  playerOneScore += rollDice;
  document.getElementById("p1Score").innerHTML = `Score ${playerOneScore}`;

  if (rollDice === 1) {
    document.getElementById("player1Button").disabled = true;
    winner();
    player = true;
    document
      .getElementById("player2Button")
      .addEventListener("click", playerTwo);
    document.getElementById("player2message").innerHTML = "player 2's turn";
  }
  if (player) {
    winner();
  }
}

function playerTwo() {
  let rollDice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-img2").src = `images/${rollDice}.svg`;
  playerTwoScore += rollDice;
  document.getElementById("p2Score").innerHTML = `Score ${playerTwoScore}`;

  if (rollDice === 1) {
    document.getElementById("player2Button").disabled = true;
    winner();
    player = true;
    document
      .getElementById("player1Button")
      .addEventListener("click", playerOne);
    document.getElementById("player1message").innerHTML = "player 1's turn";
  }
  if (player) {
    winner();
  }
}

function winner() {
  if (playerOneScore !== 0 && playerTwoScore !== 0) {
    if (playerOneScore == playerTwoScore) {
      document.getElementById("player1message").innerHTML = "match Draw!....🤦‍♂️";
    }

    if (playerOneScore > playerTwoScore) {
      document.getElementById("player1message").innerHTML =
        "Player 1 WON!....😍";
      document.getElementById("player1Button").disabled = true;
    } else {
      document.getElementById("player2message").innerHTML =
        "layer 2 WON!....😍";
      document.getElementById("player2Button").disabled = true;
    }
  }
}
