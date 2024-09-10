person1 = {
  id: 1,
  score: 0,
  turn: false,
  name:"Player 1",
};
person2 = {
  id: 2,
  score: 0,
  turn: false,
  name:"Player 2",
};

let playerID = null;

document.getElementById("startButton").addEventListener("click", start);

function start() {
  document.getElementById("startButton").disabled = true;
  let toss = Math.random();
  if (toss <= 0.5) {
    playerID = 1;
    document.getElementById("rollDice").addEventListener("click", RollDicee);
    document.getElementById("player1message").innerHTML = "player 1's turn";
  } else {
    playerID = 2;
    document.getElementById("rollDice").addEventListener("click", RollDicee);
    document.getElementById("player2message").innerHTML = "Player 2's turn";
  }
}

function RollDicee() {
  let roll = Math.floor(Math.random() * 6) + 1;
  if (playerID === 1 && person1.turn === false) {
    document.getElementById("dice-img1").src = `images/${roll}.svg`;
    person1.score += roll;
    if(person2.turn === true && person2.score < person1.score){
        person1.turn = true;
        document.getElementById(
            "player1message"
          ).innerHTML = `Score ${person1.score}`;
        winner()
        return;
    }
    else if (roll === 1) {
      person1.turn = true;
      document.getElementById(
        "player1message"
      ).innerHTML = `Score ${person1.score}`;
      if(person2.turn === false){
        document.getElementById("player2message").innerHTML = "player 2's turn";
      }
      playerID = 2;
    }
    
  } else if (playerID === 2 && person2.turn === false) {
    document.getElementById("dice-img2").src = `images/${roll}.svg`;
    person2.score += roll;
    if(person1.turn === true && person2.score > person1.score){
        person2.turn = true;
        document.getElementById(
            "player2message"
          ).innerHTML = `Score ${person2.score}`;
        winner()
        return;
    }
    else if (roll === 1) {
      person2.turn = true;
      document.getElementById(
        "player2message"
      ).innerHTML = `Score ${person2.score}`;
      if(person1.turn === false){
        document.getElementById("player1message").innerHTML = "player 1's turn";
      }
      playerID = 1;
    }
    
  }
  winner();
}

function winner() {

  if (person1.turn === true && person2.turn === true) {
    if (person1.score > person2.score) {
      document.getElementById('p1-won').innerHTML = "PLAYER 1 WON!...😎";
    } else if (person1.score < person2.score) {
      document.getElementById('p2-won').innerHTML = "PLAYER 2 WON!...😎";
    } else {
      alert("MATCH DRAW...");
    }
  }
}

console.log(person1);
console.log(person2);
