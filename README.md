# SnackRush

🌟Snack Rush

1-foods array= [cupcake, pizza, booba, candy, popcorn, ice-cream]
2-person to feed
3-timer 1: show 3 specified food icons in a message for 5s and then it well be reduced by 1s after each round: you have to memorize the specified food
4-timer 2: timer for the specified food random collection that will be changed every 10s: so after each 10s you will be moved to another level with different collection of specified food

*How to play?
memorize the specified food: if you gave him wrong item --> he will be poisoned

*goal: stay safe

*User Stories:
🐞As a player, I want a start button so that I can start playing
🐞As a player, I want a message to show the specified food and a timer showing beside them to know how much time I have in each round
🐞As a player, I want a the timer to be present in the right corner to keep track on the time left for each round
🐞As a player, I want clear images to show the available foods so I can choose from them what to feed him
🐞As a player, I want a "next" pop up message so I know that I'm moving to the next level
🐞As a player, I want a win/lose pop up message
🐞As a player, I want a restart button so that I can play again


*Diagram

start button
|
|
choice the level
|
|
show the specified food with the time for each round
|
|
hide the specified food 
|
|
show how many time left in this round
|
|
person will show up and start the game immediately
|
|
"next" message
|
|
win/lose
|
|
restart

-------------------------------------------Define constants and variables-----------------------------------------

constant foods:[cupcake, pizza, sushi, candy, popcorn, ice-cream, pretzel, chocholate, booba];

-------------------Define the app’s state variables, but don’t assign values to them-------------------------------


// Define a variable for the user's choice
let userChoice; // This will store the food item selected by the player

// Define a variable for the computer's choice 
let safeFoods = []; // This will be an array of 3 randomly selected safe foods

// Define a variable for the game message
let msg; // This will store messages like "Next Level", "You Win!", "You Lose!"

let remainingTime // this is the message that shows the remaining time for each round

let random;

------ (cache) elements in variables that need to be accessed in the JavaScript code more than once-------------


// Select the results display element
let savedResult; // this to check if the user can move to the next level in case of winning in the previous level


-----Add event listeners - use delegated event listeners to listen to multiple elements with a single listener-----

// Add an event listener to the start button
// Add an event listener to the restart button
// Add an event listener to the cupcake button
// Add an event listener to the ice-cream button
// Add an event listener to the popcorn button
// Add an event listener to the pizza button
// Add an event listener to the candy button
// Add an event listener to the sushi button

------------Invoke the init function used to initialize all state variables----------------------------


// Using the "start" event listener set up, assign the user's choice to the variable userChoice

// Using a random generator method, assign the computer's choice to the array variable safeFoods[]
const random = Math.floor(Math.random() * foods.length);
safeFoods = foods[random];


------------Invoke the primary render function that transfers all state variables to the DOM--------------

// Render the game message to the DOM
"Next level"
"You win!"
"You lose!"

-------------------Wait for the user to click on a button----------------------------------


//IF the user clicks "start" button then start the game and enter the init function to generate the computer choice 
//Compare the user choice with the computer choice
//IF the user's choice is different from the computer's choice
       //You lose message appear
//IF the user's choice is the same as the computer's choice
       //You win 
//IF the user clicks the restart button 
       //Go back to the init function to start again


