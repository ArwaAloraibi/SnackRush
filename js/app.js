/*-------------------------------- Constants --------------------------------*/

const btnEl=document.querySelectorAll('.button');  

const level1BtnEl=document.querySelector('#level1');
const level2BtnEl=document.querySelector('#level2');


const startBtnEl=document.querySelector('#start');
const pauseEl=document.querySelector("#pause");
const resumeEl=document.querySelector("#resume");

const roundTimerEl=document.querySelector('#roundTimer')
const timerBarEl=document.querySelector('#timerBar');

const gameMessage=document.querySelector('#message');
const restartBtnElm=document.querySelector('#restart');
const nextBtnEl=document.querySelector('#next');
const timerBarBtnEl=document.querySelector('#timerBar');
const streakEl=document.querySelector('#streak');

const hintBtnEl=document.querySelector('#hint');

const basketEl=document.querySelector('#basket');
const pinkTaskOneEl=document.querySelector('#pinkTaskOne');
const pinkTaskTwoEl=document.querySelector('#pinkTaskTwo');
const pinkTaskThreeEl=document.querySelector('#pinkTaskThree');

const taskOneMessageEl=document.querySelector('#taskOneMessage');
const taskTwoMessageEl=document.querySelector('#taskTwoMessage');
const taskThreeMessageEl=document.querySelector('#taskThreeMessage');

const onecompleteEl=document.querySelector('#onecomplete');
const twocompleteEl=document.querySelector('#twocomplete');
const threecompleteEl=document.querySelector('#threecomplete');



const hint1BtnEl=document.querySelector('#hint1');
const hint2BtnEl=document.querySelector('#hint2');
const hint3BtnEl=document.querySelector('#hint3');

const playNoviceBtnEl=document.querySelector("#playNovice");
const playEliteBtnEl=document.querySelector("#playElite");

const howToPlayNoviceEl=document.querySelector("#howToPlayNovice");
const howToPlayEliteEl=document.querySelector("#howToPlayElite");



/*---------------------------- Variables (state) ----------------------------*/

let foods = ['cupcake', 'pizza', 'booba', 'candy', 'popcorn', 'ice-cream', 'sushi', 'pretzel', 'chocolate'];

let displayTime=3; // this is to display the computer choice of safe foods
let roundTime=10;  // this is to display each round reamaining time 

let gameOver;

let playerChoices = [];
let safeFoods=[];
let msg;

let safeFoods1=[];
let safeFoods2=[];
let safeFoods3=[];

let playerChoices1 = [];
let playerChoices2 = [];
let playerChoices3 = [];


let random;
let allSelected;
let timeLeft;

/*------------------------ Cached Element References ------------------------*/

let roundInterval; //to save the roundTime to clear it when the player choose wrong item or time is over
let choice;

let streakCount;
let levels=0;

let task1Complete = false;
let task2Complete = false;
let task3Complete = false;
/*-------------------------------- Functions --------------------------------*/

function foodEmoji(foodName) {
  const emojiMap = {
    cupcake: '🧁',
    pizza: '🍕',
    booba: '🧋',
    candy: '🍭',
    popcorn: '🍿',
    'ice-cream': '🍨',
    sushi: '🍣',
    pretzel: '🥨',
    chocolate: '🍫',
  };
  return emojiMap[foodName] || '';
}

function init(){

  btnEl.forEach(button => {
  button.removeEventListener('click', handlePlayerChoiceNovice);
  button.removeEventListener('click', handlePlayerChoiceElite);
});

  restartBtnElm.classList.add("hidden");
  gameMessage.classList.add('hidden');
  streakEl.classList.add('hidden');
  basketEl.classList.add('hidden');

  hintBtnEl.classList.add("hidden");
  hint1BtnEl.classList.add('hidden');
  hint2BtnEl.classList.add('hidden');
  hint3BtnEl.classList.add('hidden');

   taskOneMessageEl.classList.add('hidden');
   taskTwoMessageEl.classList.add('hidden');
   taskThreeMessageEl.classList.add('hidden');

   pinkTaskOneEl.classList.add('hidden');
   pinkTaskTwoEl.classList.add('hidden');
   pinkTaskThreeEl.classList.add('hidden');


  startBtnEl.classList.add('hidden'); //hide the start button
  level1BtnEl.classList.remove('hidden'); // add  the level buttons 
  level2BtnEl.classList.remove('hidden');

  //show the how to play buttons
  playNoviceBtnEl.classList.remove('hidden');
  playEliteBtnEl.classList.remove('hidden');
  
  resumeEl.classList.add('hidden'); //hide the pause and resume buttons
  pauseEl.classList.add('hidden');

  gameOver=false;
  playerChoices = [];
  playerChoices1=[];
  playerChoices2=[];
  playerChoices3=[];
  safeFoods = [];
  safeFoods1=[];
  safeFoods2=[];
  safeFoods3=[];

  streakCount=0;

  if (roundInterval) clearInterval(roundInterval);

    displayTime=3;
    roundTime=10;
}

//reset for Elite tasks 

//Handle level 1 (Novice)
function handleLevel1() {

  //hide the levels buttons and how to play buttons
  level1BtnEl.classList.add('hidden');
  level2BtnEl.classList.add('hidden');
  playNoviceBtnEl.classList.add('hidden');
  playEliteBtnEl.classList.add('hidden');
  howToPlayEliteEl.classList.add('hidden');
  howToPlayNoviceEl.classList.add('hidden');

  pinkTaskOneEl.classList.add('hidden'); //hide the tasks for the Elite level
  pinkTaskTwoEl.classList.add('hidden');
  pinkTaskThreeEl.classList.add('hidden');

  streakEl.classList.add('hidden'); // hide the streak for now

  
  pauseEl.classList.remove('hidden'); // show pause
  resumeEl.classList.add('hidden');  // ensure resume stays hidden untill pause is clicked


  //generating the safe foods
  const shuffledFoods = [...foods].sort(() => 0.5 - Math.random()); //make a copy of the foods array to shuffle through it 
  safeFoods = shuffledFoods.slice(0, 3); //get the first 3 items from the shuffled list


  //show the message of the safe foods
  gameMessage.textContent = `Safe Foods: ${safeFoods.map(f => foodEmoji(f)).join(' ')}`;
  gameMessage.classList.remove('hidden');

  pauseEl.classList.remove('hidden');


// this is a built in function to hide the message after some time
  setTimeout(() => {

    gameMessage.classList.add('hidden');
    hintBtnEl.classList.remove("hidden");

    startRoundTimer();// show the time left after the message disapper 

    handlePlayerChoiceNovice();
     

  }, displayTime*1000); //display for 3s


}

// handle the time left for the player in each round whice is 10s for each
function startRoundTimer() {

  timerBarEl.classList.remove('hidden');   //show the timer bar
  timeLeft = roundTime;

  roundTimerEl.classList.remove('hidden'); // show the time left
  roundTimerEl.textContent = `⏱️ Time left: ${timeLeft}s`;

    timerBarEl.style.width = '100%';

    // Clear previous interval if any
  if (roundInterval) {
    clearInterval(roundInterval);
  }

  roundInterval = setInterval(() => {
    timeLeft--;
    roundTimerEl.textContent = `⏱️ Time left: ${timeLeft}s`;

    // Shrink the timer bar width
    const percent = (timeLeft / roundTime) * 100;
    timerBarEl.style.width = `${percent}%`;
    
    // clear if time is over Lose
    if (timeLeft <= 0) {
      clearInterval(roundInterval);
      roundTimerEl.classList.add("hidden");
      timerBarEl.style.width = '0%';

      gameMessage.textContent = "⏱️ Time is over!";
      gameMessage.classList.remove("hidden");
      gameOver=true;
      restartBtnElm.classList.remove("hidden");
      streakEl.classList.remove('hidden'); //if they lose then show the streak
      streakEl.textContent = `Streak: ${streakCount}`;
      hintBtnEl.classList.add('hidden');
      basketEl.classList.add('hidden');

      hint1BtnEl.classList.add('hidden');
      hint2BtnEl.classList.add('hidden');
      hint3BtnEl.classList.add('hidden');

      taskOneMessageEl.classList.add('hidden');
      taskTwoMessageEl.classList.add('hidden');
      taskThreeMessageEl.classList.add('hidden');

      pinkTaskOneEl.classList.add('hidden');
      pinkTaskTwoEl.classList.add('hidden');
      pinkTaskThreeEl.classList.add('hidden');


    }
  }, 1000);
}

//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//

  //Elite level
function handleLevel2() {

  streakEl.classList.add('hidden'); //there is no streak for this level
  level1BtnEl.classList.add('hidden'); //hide the level buttons after choosing the level
  level2BtnEl.classList.add('hidden');
  basketEl.classList.remove('hidden'); //show basket
  pinkTaskOneEl.classList.remove('hidden'); //show tasks
  pinkTaskTwoEl.classList.remove('hidden');
  pinkTaskThreeEl.classList.remove('hidden');

  //hide the how to play buttons
  playNoviceBtnEl.classList.add('hidden');
  playEliteBtnEl.classList.add('hidden');
  howToPlayEliteEl.classList.add('hidden');
  howToPlayNoviceEl.classList.add('hidden');


pauseEl.classList.remove('hidden'); // show pause
resumeEl.classList.add('hidden');  // ensure resume stays hidden untill pause is clicked

  //generating the safe foods for task 1
  let shuffledFoods = [...foods].sort(() => 0.5 - Math.random()); //make a copy of the foods array to shuffle through it 
  safeFoods1 = shuffledFoods.slice(0, 3); //get the first 3 items from the shuffled list

  //generating the safe foods for task 2
   shuffledFoods = [...foods].sort(() => 0.5 - Math.random()); 
   safeFoods2 = shuffledFoods.slice(0, 3); 
  
   //generating the safe foods for task 3
   shuffledFoods = [...foods].sort(() => 0.5 - Math.random()); 
   safeFoods3 = shuffledFoods.slice(0, 3); 


  //show the message of the safe foods for task 1
  taskOneMessageEl.textContent = `${safeFoods1.map(f => foodEmoji(f)).join('\n')}`;
  taskOneMessageEl.classList.remove('hidden');

  
  //show the message of the safe foods for task 2
  taskTwoMessageEl.textContent = `${safeFoods2.map(f => foodEmoji(f)).join('\n')}`;
  taskTwoMessageEl.classList.remove('hidden');

  
  //show the message of the safe foods for task 3
  taskThreeMessageEl.textContent = `${safeFoods3.map(f => foodEmoji(f)).join('\n')}`;
  taskThreeMessageEl.classList.remove('hidden');


  //Drag and drop

// Make all food emojis in BtnEl draggable
btnEl.forEach(button => {
  button.setAttribute("draggable", true);

  button.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

// dropping into basket
basketEl.addEventListener("dragover", (event) => {
  event.preventDefault(); // must prevent default to allow drop
});

basketEl.addEventListener("drop", (event) => {
  event.preventDefault();
  const foodId = event.dataTransfer.getData("text/plain");

  // call the check function
  handlePlayerChoiceElite(foodId);
});



// this is a built in function to hide the message after some time
  setTimeout(() => {

    gameMessage.classList.add('hidden');
    taskOneMessageEl.classList.add('hidden');
    taskTwoMessageEl.classList.add('hidden');
    taskThreeMessageEl.classList.add('hidden');


    hint1BtnEl.classList.remove("hidden");
    hint2BtnEl.classList.remove("hidden");
    hint3BtnEl.classList.remove("hidden");


    roundTime = 40;       // Elite round time 40s
    startRoundTimer();// show the time left after the message disapper 
     
  }, displayTime*3000); //3s display for now

}


//-------------------------------------handlePlayerChoiceElite-----------------------------------------------
function handlePlayerChoiceElite(event) {

// Make all food emojis draggable
btnEl.forEach(button => {
  //make the buttons dragable only and not clickable
  button.removeEventListener('click', handlePlayerChoiceNovice);
  button.setAttribute("draggable", true);

  button.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

// Allow dropping on basket
basketEl.addEventListener("dragover", (event) => {
  event.preventDefault(); 
});

// Drop logic
basketEl.addEventListener("drop", (event) => {
  event.preventDefault();
  const foodId = event.dataTransfer.getData("text/plain");


  // Task 1
  if (safeFoods1.includes(foodId) && !playerChoices1.includes(foodId)) {
    playerChoices1.push(foodId);
    if (safeFoods1.every(f => playerChoices1.includes(f))) {
      onecompleteEl.classList.remove('hidden');
      onecompleteEl.textContent='✔️';

      task1Complete = true;
    }
  }

  // Task 2
  if (task1Complete){
  if (safeFoods2.includes(foodId) && !playerChoices2.includes(foodId)) {
    playerChoices2.push(foodId);
    if (safeFoods2.every(f => playerChoices2.includes(f))) {
      twocompleteEl.classList.remove('hidden');
      twocompleteEl.textContent='✔️';

      task2Complete = true;
    }
  }
  }
  // Task 3
  if (task2Complete){
  if (safeFoods3.includes(foodId) && !playerChoices3.includes(foodId)) {
    playerChoices3.push(foodId);
    if (safeFoods3.every(f => playerChoices3.includes(f))) {
      threecompleteEl.classList.remove('hidden');
      threecompleteEl.textContent='✔️';

      task3Complete = true;
    }
  }
}

  // Win condition
  if (task1Complete && task2Complete && task3Complete) {
    clearInterval(roundInterval);
    gameOver = true;
    gameMessage.textContent = "You Won 🎉🎉";
    gameMessage.classList.remove("hidden");
    restartBtnElm.classList.remove("hidden");

    taskOneMessageEl.classList.add('hidden');
    taskTwoMessageEl.classList.add('hidden');
    taskThreeMessageEl.classList.add('hidden');

    pinkTaskOneEl.classList.add('hidden');
    pinkTaskTwoEl.classList.add('hidden');
    pinkTaskThreeEl.classList.add('hidden');

    onecompleteEl.classList.add('hidden');
    twocompleteEl.classList.add('hidden');
    threecompleteEl.classList.add('hidden');

    hint1BtnEl.classList.add('hidden');
    hint2BtnEl.classList.add('hidden');
    hint3BtnEl.classList.add('hidden');

    roundTimerEl.classList.add('hidden');
    timerBarEl.style.width = '0%';

    basketEl.classList.add('hidden');

  }
});

}
//-------------------------------------handlePlayerChoiceNovice-----------------------------------------------



function handlePlayerChoiceNovice(event) {
  if (gameOver) return; // prevent interaction after game is over

  choice = event.target.id;               
  if (!choice) return;   
  

  //if the choice is not included in the safe foods array then wrong pick
  if (!safeFoods.includes(choice)) {
    clearInterval(roundInterval);
    gameOver = true;

    gameMessage.textContent = "Poisoned ☠️";    
    gameMessage.classList.remove('hidden');

    timerBarEl.style.width = '0%';
    roundTimerEl.classList.add('hidden');
    restartBtnElm.classList.remove('hidden');

    timerBarEl.classList.add('hidden');
    
    streakEl.textContent = `Streak: ${streakCount}`;
    streakEl.classList.remove('hidden');
    hintBtnEl.classList.add('hidden');

    return;
  }
  
  else {
     choice = event.target.id;
  // if it is a correct choice then push it inside the playerChoices array 
   if (safeFoods.includes(choice)) {
    playerChoices.push(choice);

  }
  }

  // Check if all safe foods have been selected to move to the next level
  //WIN WIN WIN WIN WIN WIN
   allSelected = safeFoods.every(f => playerChoices.includes(f));
  if (allSelected) {
    clearInterval(roundInterval);
    gameOver = true;
    roundTimerEl.classList.add('hidden');
    
    timerBarEl.style.width = '0%';
    gameMessage.textContent = "You Won 🎉🎉";
    gameMessage.classList.remove('hidden');
    nextBtnEl.classList.remove('hidden');
    streakEl.classList.add('hidden');
    hintBtnEl.classList.add('hidden');
    BtnEl.style.opacity='0.5';
  }

}

  function nextLevel(){
  //in the next level it will works like handlePlayerChoice put with less disaple time for the message of the safe food
  // Hide next button

  streakEl.classList.add('hidden');
  roundTimerEl.classList.remove('hidden');
  nextBtnEl.classList.add('hidden');

  levels++;

  //streak will be counted only if they move to the next level
  streakCount=levels;
   
  // Reset states
  gameOver = false;
  playerChoices = [];
  safeFoods = [];
  if (roundInterval) clearInterval(roundInterval);

  displayTime = Math.max(5 - (levels - 1), 3);  // less time to see safe foods //start with 5s but never below 3
  roundTime = 10; 

  timeLeft = roundTime;                  // reset time
  roundTimerEl.textContent = `⏱️ Time left: ${timeLeft}s`; //  show new time
  timerBarEl.style.width = '100%';      // reset timer bar

  // Generate more safe foods
  const shuffledFoods = [...foods].sort(() => 0.5 - Math.random());
  safeFoods = shuffledFoods.slice(0, 4); // 4 safe foods now

  gameMessage.textContent = `Safe Foods: ${safeFoods.map(f => foodEmoji(f)).join(' ')}`;
  gameMessage.classList.remove('hidden');

  setTimeout(() => {
    gameMessage.classList.add('hidden');
    hintBtnEl.classList.remove("hidden");
    startRoundTimer();

  }, displayTime * 1000);

}

//-----------------------------DO NOT TOUCH-------------------------------------------------

function pause(){

 clearInterval(roundInterval); // stops the countdown

  pauseEl.classList.add('hidden');// hide the pause button
  resumeEl.classList.remove('hidden');//show the resume button

}

function resume() {
  pauseEl.classList.remove('hidden');
  resumeEl.classList.add('hidden');

  // Resume countdown from saved timeLeft
  roundInterval = setInterval(() => {
    timeLeft--;
    roundTimerEl.textContent = `⏱️Time left: ${timeLeft}s`;

    // Smooth bar animation based on remaining time
    percent = (timeLeft / roundTime) * 100;
    timerBarEl.style.width = `${percent}%`;

    // When time runs out
    if (timeLeft <= 0) {
      clearInterval(roundInterval);
      roundTimerEl.classList.add("hidden");
      timerBarEl.style.width = '0%';
      gameMessage.textContent = "Time is over💔";
      gameMessage.classList.remove("hidden");
      gameOver = true;
      restartBtnElm.classList.remove("hidden");
      streakEl.classList.remove('hidden');
      streakEl.textContent = `Streak: ${streakCount}`;
    }
  }, 1000);
}


function handleHint() {

  // Show the safe foods in a message
  gameMessage.textContent = `Hint: ${safeFoods.map(f => foodEmoji(f)).join(' ')}`;
  gameMessage.classList.remove('hidden');

  //hide the hint after a 3 seconds
  setTimeout(() => {
    gameMessage.classList.add('hidden');
  }, 1000);
}

function handleHint1(){

  taskOneMessageEl.classList.remove('hidden');
  taskOneMessageEl.textContent = `${safeFoods1.map(f => foodEmoji(f)).join('\n')}`;

  setTimeout(() => {
    taskOneMessageEl.classList.add('hidden');
  }, 3000)

}

function handleHint2(){
  taskTwoMessageEl.textContent = `${safeFoods2.map(f => foodEmoji(f)).join('\n')}`;
  taskTwoMessageEl.classList.remove('hidden');

    setTimeout(() => {
    taskTwoMessageEl.classList.add('hidden');
  }, 3000)

}

function handleHint3(){
  
  taskThreeMessageEl.textContent = `${safeFoods3.map(f => foodEmoji(f)).join('\n')}`;
  taskThreeMessageEl.classList.remove('hidden');

   
   setTimeout(() => {
    taskThreeMessageEl.classList.add('hidden');
  }, 3000)

}

function handleHowToPlayNovice (){
  howToPlayNoviceEl.classList.remove('hidden');
  howToPlayEliteEl.classList.add('hidden');
}

function handleHowToPlayElite(){
  howToPlayEliteEl.classList.remove('hidden');
  howToPlayNoviceEl.classList.add('hidden');

}
/*----------------------------- Event Listeners -----------------------------*/


startBtnEl.addEventListener('click', init);

level1BtnEl.addEventListener('click', handleLevel1);
level2BtnEl.addEventListener('click', handleLevel2);

//add an eventlistiner to each icon for Novice level
level1BtnEl.addEventListener('click', () => {
  btnEl.forEach(button => {
    button.addEventListener('click', handlePlayerChoiceNovice);    
  });
});


// add an eventlistiner to each icon for Elite level
level2BtnEl.addEventListener('click', () => {
  btnEl.forEach(button => {
    button.addEventListener('click', handlePlayerChoiceElite);
  });
});


addEventListener("drag", (event) => { })

ondrag = (event) => { }


restartBtnElm.addEventListener('click', init);

nextBtnEl.addEventListener('click', nextLevel);

resumeEl.addEventListener('click', resume);
pauseEl.addEventListener('click', pause);

hintBtnEl.addEventListener('click', handleHint);

hint1BtnEl.addEventListener('click',handleHint1);

hint2BtnEl.addEventListener('click',handleHint2);

hint3BtnEl.addEventListener('click',handleHint3);

playNoviceBtnEl.addEventListener('click',handleHowToPlayNovice);
playEliteBtnEl.addEventListener('click',handleHowToPlayElite);
