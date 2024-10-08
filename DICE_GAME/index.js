

const player = [

  {
    id: 1,
    name: "Player 1",
    score: 0,
    turn: false,
  },

  {
    id: 2,
    name: "Player 2",
    score: 0,
    turn: false,
  },

];

document.getElementById("startButton").addEventListener("click", start);

function start() {

  const toss = Number(Math.random() < 0.5);

  player[toss].turn = true;

  document.getElementById("startButton").disabled = true;

  const currentPlayer = player.find( p => p.turn === true);

  turnMessage(currentPlayer.id);


}

function turnMessage(id){

  document.getElementById(`player${id}message`).innerHTML = `${player[id-1].name}`;
  
}

document.getElementById("rollDice").addEventListener("click", diceRoll);

let count = 0;

function diceRoll(){

  let roll = Math.floor(Math.random() * 6) + 1;

  const currentPlayer = player.find( p=> p.turn === true);
   
  changeDiceImages(roll, currentPlayer.id);

  countScore(roll);

  if (roll === 1) {
    count += 1;
    if (count === 2) {
      
      player[0].turn = true;
      player[1].turn = true;
      
      winner();
      return;
      
    }
    
    switchPlayer();
  
  
    
  }
  winner();

  

}

function changeDiceImages(roll, playerId){

  document.getElementById(`dice-img${playerId}`).src = `images/${roll}.svg`;

}

function countScore(roll){

  const currentPlayer = player.find( p=> p.turn === true);

  currentPlayer.score += roll;
    
  document.getElementById(`player${currentPlayer.id}message`).innerHTML = `${player[currentPlayer.id-1].score}`;

}

function switchPlayer(){

    const currentPlayer = player.find( p=> p.turn === true)

    const nextPlayer = player.find( p=> p.turn === false)

    nextPlayer.turn = true;
    currentPlayer.turn = false;

    turnMessage(nextPlayer.id);
   
}

function winner(){

  const player1 = player[0];
  const player2 = player[1];

  if ((player1.turn && player2.turn)) {

    if (player1.score > player2.score) {

      showResult(player1.id);
      return;

    } else if (player1.score < player2.score) {

      showResult(player2.id);
      return;
    } else {

      alert("MATCH DRAW...");
      return;

    }
  
}

  const nextPlayer = player.find( p=> p.turn === false)

  const currentPlayer = player.find( p=> p.turn === true);

  if (nextPlayer.turn === false && nextPlayer.score !== 0) {
    
    if (currentPlayer.score > nextPlayer.score) {
      
      showResult(currentPlayer.id);


      return;

    }

  }
  

}

function showResult(id){

  document.getElementById(`p${id}-won`).innerHTML = `Player ${id} WON...😎`;

  document.getElementById('rollDice').disabled = true;


}



