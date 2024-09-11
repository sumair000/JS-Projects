

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

  turnMessage(toss)


}

function turnMessage(toss){

  // console.log("toss value is: ",toss);

  document.getElementById(`player${toss + 1}message`).innerHTML = `${player[toss].name}`;

}

function diceRoll(){

}



