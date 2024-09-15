

const allPLayers = [
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

  {
    id: 3,
    name: "Player 3",
    score: 0,
    turn: false,
  },

  {
    id: 4,
    name: "Player 4",
    score: 0,
    turn: false,
  },

  {
    id: 5,
    name: "Player 5",
    score: 0,
    turn: false,
  },

  {
    id: 6,
    name: "Player 6",
    score: 0,
    turn: false,
  },

  {
    id: 7,
    name: "Player 7",
    score: 0,
    turn: false,
  },

  {
    id: 8,
    name: "Player 8",
    score: 0,
    turn: false,
  },
];

let quaterPlayers = [];



let first = 1;
let second = 5;

let playMatch;

document.getElementById("startButton").addEventListener("click", startGame);

document.getElementById("tossButton").addEventListener("click", toss);

document.getElementById("rollDice").addEventListener("click", diceRoll);

document.getElementById('nextMatch').addEventListener('click',reset);

let matchNumber = 0;

function startGame() {

    console.log(allPLayers);
    
  document.getElementById("startButton").disabled = true;
  matchNumber += 1;
  showMessage(matchNumber);

  
  updateIds(first,second);
  first +=1;
  second +=1;
    // console.log(first,second);
    
}

function showMessage(number) {

  alert(`Mathch No: ${number} started!...`);

}

function updateIds(newId1, newId2) {

    id1 = newId1;
    id2 = newId2;

    playMatch = allPLayers.filter((pair) => {

      return pair.id === id1 || pair.id === id2;

    }).map(p => ({...p}));

    playMatch[0].id = 1;
    playMatch[1].id = 2;
    console.log(playMatch); 



    return playMatch;
}


function toss() {

  document.getElementById("tossButton").disabled = true;

  let wonToss = Math.random() < 0.5 ? 0 : 1;

  // console.log(playMatch);

  playMatch[wonToss].turn = true;

  console.log(playMatch[wonToss].name);
  // console.log(playMatch[wonToss].id);

  console.log(playMatch);
  

  turnMessage(wonToss);

}

function turnMessage(id) {

//   console.log("array idex", id);

//   console.log("--------------------------->");

  const message = document.createElement("h3");

  message.id = "turnMessage";
  message.innerText = `${playMatch[id].name}'s turn`;

  document.getElementById("playermessage").appendChild(message);


}

let count = 0;

function diceRoll() {

  let roll = Math.floor(Math.random() * 6) + 1;

  const currentPlayer = playMatch.find((p) => p.turn === true);

//   console.log("dice before id", currentPlayer.id);

  changeDiceImages(roll, currentPlayer.id);

  countScore(roll);

  if (roll === 1) {
    count += 1;
    console.log('count ki value',count);
    if (count === 2) {
      playMatch[0].turn = true;
      playMatch[1].turn = true;
        console.log('dono true hain');
        
    
    

      winner();
      return;
    }
    switchPlayer();

  }
  winner();

}

function changeDiceImages(roll, playerId) {

//   console.log("ch img id: ", playerId);


  document.getElementById(`dice-img${playerId}`).src = `images/${roll}.svg`;

}

function countScore(roll) {

  const currentPlayer = playMatch.find((p) => p.turn === true);

  currentPlayer.score += roll;

  document.getElementById(`score-area${currentPlayer.id}`).innerHTML = `score: ${currentPlayer.score}`;

  console.log("score--->", currentPlayer.score);

}

function switchPlayer() {

  const currentPlayer = playMatch.find((p) => p.turn === true);

  const nextPlayer = playMatch.find((p) => p.turn === false);

  nextPlayer.turn = true;

  currentPlayer.turn = false;

//   console.log("next allPLayers id", nextPlayer.id - 1);

  document.getElementById("playermessage").innerHTML = "";
  console.log(nextPlayer.name);
  console.log(nextPlayer.turn);
  console.log(currentPlayer.name);
  console.log(currentPlayer.turn);





  turnMessage(nextPlayer.id - 1);

}

function winner() {

  const player1 = playMatch[0];
  const player2 = playMatch[1];

  if (player1.turn && player2.turn) {
    if (player1.score > player2.score) {

        const pName = player1.name;
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);

        showResult(player1.name);
      return;
    } else if (player1.score < player2.score) {
        
        const pName = player2.name;
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);

        showResult(player2.name);
      return;
    } else {
      alert("MATCH DRAW...");
        document.getElementById("rollDice").disabled = true;
      return;
    }
  }

  const prePlayer = playMatch.find((p) => p.turn === false);

  const currentPlayer = playMatch.find((p) => p.turn === true);
  console.log(prePlayer.name);
  console.log(prePlayer.turn);
  console.log(currentPlayer.name);
  console.log(currentPlayer.turn);



  if ((prePlayer.turn === false) && (prePlayer.score !== 0)) {
    if (currentPlayer.score > prePlayer.score) {

        const pName = currentPlayer.name;
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);
      showResult(currentPlayer.name);

      return;
    }
  }

}

function showResult(id) {

  document.getElementById(`p-won`).innerHTML = `Player ${id} WON...😎`;

  document.getElementById("rollDice").disabled = true;

  console.log(quaterPlayers); 

}

function reset(){

    // playMatch[0].id = 0;
    // playMatch[1].id = 0;
    count = 0;
    document.getElementById("turnMessage").innerHTML = "";
    document.getElementById(`score-area1`).innerHTML = "";
    document.getElementById(`score-area2`).innerHTML = "";
    document.getElementById(`p-won`).innerHTML = "";
    document.getElementById(`dice-img1`).src = `images/1.svg`;
    document.getElementById(`dice-img2`).src = `images/1.svg`;




  document.getElementById("startButton").disabled = false;

  document.getElementById("tossButton").disabled = false;

  document.getElementById("rollDice").disabled = false;
sortArray();

}

function sortArray(){
    quaterPlayers.sort();
    console.log(quaterPlayers);
    
}

