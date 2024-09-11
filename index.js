

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


function diceRoll(){

  let roll = Math.floor(Math.random() * 6) + 1;

  const currentPlayer = player.find( p=> p.turn === true);
   
  changeDiceImages(roll, currentPlayer.id);

  countScore(roll);

  if (roll === 1) {
    switchPlayer();
  }



}

function changeDiceImages(roll, playerId){

  document.getElementById(`dice-img${playerId}`).src = `images/${roll}.svg`;

}

function countScore(roll){

  const currentPlayer = player.find( p=> p.turn === true);

  currentPlayer.score += roll;

  console.log(currentPlayer.score);
  
   
}

function switchPlayer(roll){

    const currentPlayer = player.find( p=> p.turn === true)

    const nextPlayer = player.find( p=> p.turn === false)

    nextPlayer.turn = true;
    currentPlayer.turn = false;
   
}

