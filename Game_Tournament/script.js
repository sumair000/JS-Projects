

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

let playMatch = [];

document.getElementById("startButton").addEventListener("click", startGame);

document.getElementById("tossButton").addEventListener("click", toss);

document.getElementById("rollDice").addEventListener("click", diceRoll);

document.getElementById('nextMatch').addEventListener('click',reset);

let matchNumber = 0;

function startGame() {
    
  document.getElementById("startButton").disabled = true;
  matchNumber += 1;
  showMessage(matchNumber);

  if (matchNumber <= 4) {
        updateIds(first,second);
        first +=1;
        second +=1;
  }
  
    
}

function showMessage(number) {

    if(number > 6){
        alert(`FINAL MATCH IS STARTED!....`);
    }
    else if (number > 4) {
        alert(` Semi Final Matche ${number - 4} started!...`);  
    }
    else{
        alert(`Quater Final Match No: ${number} started!...`);
    }


}

function updateIds(newId1, newId2) {

    id1 = newId1;
    id2 = newId2;

    if ((id1 === 0 && id2 === 2) || (id1 === 2 && id2 === 4)) {
        
        playMatch = [];

        for (let i = id1; i < id2; i++) {
        
            playMatch.push({...quaterPlayers[i]})
        }
        // playMatch = quaterPlayers.slice(id1,id2).map(p=> ({...p}));
        console.log(playMatch);
         
    }
    else{
        
        playMatch = [];
        
        for (let i = 0; i < allPLayers.length; i++) {
            
            if (allPLayers[i].id === id1) {
                playMatch.push({...allPLayers[i]})
            }
            if (allPLayers[i].id === id2) {
                playMatch.push({...allPLayers[i]})
            }
                
        }
    // playMatch = allPLayers.filter((pair) => {

    //     return pair.id === id1 || pair.id === id2;
  
    //   }).map(p => ({...p}));
    }
    console.log(playMatch);



    playMatch[0].id = 1;
    playMatch[1].id = 2;

    return playMatch;
}


function toss() {

  document.getElementById("tossButton").disabled = true;

  let wonToss = Math.random() < 0.5 ? 0 : 1;

  playMatch[wonToss].turn = true;

  turnMessage(wonToss);

}

function turnMessage(id) {

  const message = document.createElement("h3");

  message.id = "turnMessage";
  message.innerText = `${playMatch[id].name}'s turn`;

  document.getElementById("playermessage").appendChild(message);


}

let count = 0;

function diceRoll() {

  let roll = Math.floor(Math.random() * 6) + 1;

    console.log(playMatch);

    let currentPlayer = null;

    for(let i = 0; i < playMatch.length; i++){

        if(playMatch[i].turn){

            console.log(playMatch);
            console.log(playMatch[i]);
            
            currentPlayer = playMatch[i];
            
        }
    }
    // const currentPlayer = playMatch.find((p) => p.turn === true);

    console.log(playMatch);


  changeDiceImages(roll, currentPlayer.id);

  countScore(roll);

  if (roll === 1) {

    count += 1;

    if (count === 2) {

      playMatch[0].turn = true;
      playMatch[1].turn = true;
    
      winner();
      return;
    }
    switchPlayer();
  }
  winner();

}

function changeDiceImages(roll, playerId) {

  document.getElementById(`dice-img${playerId}`).src = `images/${roll}.svg`;

}

function countScore(roll) {

  const currentPlayer = playMatch.find((p) => p.turn === true);

  currentPlayer.score += roll;

  document.getElementById(`score-area${currentPlayer.id}`).innerHTML = `score: ${currentPlayer.score}`;

}

function switchPlayer() {

  const currentPlayer = playMatch.find((p) => p.turn === true);

  const nextPlayer = playMatch.find((p) => p.turn === false);

  nextPlayer.turn = true;

  currentPlayer.turn = false;

  document.getElementById("playermessage").innerHTML = "";

  turnMessage(nextPlayer.id - 1);

}

function winner() {

  const player1 = playMatch[0];
  const player2 = playMatch[1];

  if (player1.turn && player2.turn) {
    if (player1.score > player2.score) {

        const pName = player1.name;
        console.log('won: ',pName);
        
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);

        showResult(player1.name);
        return;

    } 
    else if (player1.score < player2.score) {
        
        const pName = player2.name;
        console.log('won: ',pName);
        
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);

        showResult(player2.name);
        return;

    }
     else {

      alert("MATCH DRAW...");
      alert("Both player have playe again,Score is set to zero,just roll the dice and play")
      player1.score = 0;
      player1.turn = true;
      player2.score = 0;
      player2.turn = false;
      return;
    }
  }

  const prePlayer = playMatch.find((p) => p.turn === false);

  const currentPlayer = playMatch.find((p) => p.turn === true);

  if ((prePlayer.turn === false) && (prePlayer.score !== 0)) {

    if (currentPlayer.score > prePlayer.score) {

        const pName = currentPlayer.name;
        console.log('won: ',pName);
        
        const index = allPLayers.findIndex((p) => p.name === pName)
        quaterPlayers.push(allPLayers[index]);
        showResult(currentPlayer.name);

      return;
    }
  }

}

function showResult(id) {

    if (matchNumber > 6) {
        
        document.getElementById(`navBar1`).innerHTML = `${id} WON THE FINAL MATCH 😎😎😍😍`;
        document.getElementById("rollDice").disabled = true;
        document.getElementById('nextMatch').disabled = true;
        
    }
    else{
        document.getElementById(`p-won`).innerHTML = `${id} WON...😎`;

        document.getElementById("rollDice").disabled = true;
    }
  
}

function reset(){

    count = 0;
    document.getElementById("turnMessage").innerHTML = "";
    document.getElementById(`score-area1`).innerHTML = "";
    document.getElementById(`score-area2`).innerHTML = "";
    document.getElementById(`p-won`).innerHTML = "";
    document.getElementById(`dice-img1`).src = `images/1.svg`;
    document.getElementById(`dice-img2`).src = `images/1.svg`;

    if (matchNumber === 6) {
        
        quaterPlayers.splice(0,4);
        
    }


  document.getElementById("startButton").disabled = false;

  document.getElementById("tossButton").disabled = false;

  document.getElementById("rollDice").disabled = false;

  if(matchNumber >= 4){
    
    first = 0;
    second = 2;
    if (matchNumber === 5) {
        
        updateIds(first+2,second+2);
        return;

        }

    updateIds(first,second);

  }

}


