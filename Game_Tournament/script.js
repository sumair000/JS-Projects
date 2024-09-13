
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

document.getElementById('startButton').addEventListener('click',startGame);

document.getElementById('tossButton').addEventListener('click',toss);

document.getElementById("rollDice").addEventListener("click", diceRoll);


let matchNumber = 0;

function startGame(){

    document.getElementById("startButton").disabled = true;
    matchNumber += 1;
    showMessage(matchNumber);
}

function showMessage(number){

    alert(`Mathch No: ${number} started!...`)
}

let playMatch = player.filter(pair => {
    
    return pair.id === 1 || pair.id === 5
    })
    playMatch[0].id = 1;
    playMatch[1].id = 2;

    console.log(playMatch);

function toss(){

    document.getElementById("tossButton").disabled = true;
    
    let wonToss = Math.random() < 0.5 ? 0: 1;

    // console.log(playMatch);
    

    playMatch[wonToss].turn = true;

    console.log(playMatch[wonToss].name);
    // console.log(playMatch[wonToss].id);
    
    
    turnMessage(wonToss);

}


function turnMessage(id){


    console.log('array idex',id);

    console.log('--------------------------->');

    
  const message = document.createElement('h3');

  message.innerText = `${playMatch[id].name}'s turn`;

  document.getElementById('playermessage').appendChild(message);

  
}

let count = 0;

function diceRoll(){

  let roll = Math.floor(Math.random() * 6) + 1;

  const currentPlayer = playMatch.find( p=> p.turn === true);

  console.log('dice before id',currentPlayer.id);

  
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


function changeDiceImages(roll, playerId){

    console.log('ch img id: ',playerId);
    

    document.getElementById(`dice-img${playerId}`).src = `images/${roll}.svg`;
  
  }

function countScore(roll){

    const currentPlayer = playMatch.find( p=> p.turn === true);
  
    currentPlayer.score += roll;

    document.getElementById(`score-area${currentPlayer.id}`).innerHTML = `score: ${currentPlayer.score}`;

    console.log('score--->',currentPlayer.score);
    

}

function switchPlayer(){

    const currentPlayer = playMatch.find( p=> p.turn === true)

    const nextPlayer = playMatch.find( p=> p.turn === false)

    nextPlayer.turn = true;
    currentPlayer.turn = false;

    console.log('next player id',nextPlayer.id-1);
    
    document.getElementById('playermessage').innerHTML = "";
    turnMessage(nextPlayer.id-1);
   
}


function winner(){

    const player1 = playMatch[0];
    const player2 = playMatch[1];
  
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
  
    const nextPlayer = playMatch.find( p=> p.turn === false)
  
    const currentPlayer = playMatch.find( p=> p.turn === true);
  
    if (nextPlayer.turn === false && nextPlayer.score !== 0) {
      
      if (currentPlayer.score > nextPlayer.score) {
        
        showResult(currentPlayer.id);
  
  
        return;
  
      }
  
    }
    
  
  }
  
  function showResult(id){
  
    document.getElementById(`p-won`).innerHTML = `Player ${id} WON...😎`;
  
    document.getElementById('rollDice').disabled = true;
  
  
  }

  

  