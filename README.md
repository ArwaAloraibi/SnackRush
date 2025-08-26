# SnackRush

🌟Snack Rush

• Main Elemnts
</br>1-foods array= [cupcake, pizza, booba, candy, popcorn, ice-cream, sushi, pretzel, chocolate]
</br>2-timer 1: show safe food in a message for 3s
</br>3-timer 2: 10s or 40s round timer 
</br>4-message 

![Home Page](https://i.imgur.com/6YY6q5V.png)
![Novice Level](https://i.imgur.com/B2q6bX5.png)
![Novice Level: Playing State](https://i.imgur.com/EHsHr13.png)
![Novice Level: Lose State](https://i.imgur.com/I46gJrd.png)
![Elite Level](https://i.imgur.com/Yd0JfHs.png)

• How to play?

♦️Novice Level
*memorize the safe food: 
>>if you choose wrong item --> poisoned = lose
>>>if all selected foods are safe --> move to the next level = win
>>>>*goal: stay safe

♦️Elite Level
*momorize the tasks
>>*finish all three tasks by dragging the correct food for each task into the basket to win
>>>>*goal: finish all tasks before time is over


• Diagram

![Diagram](https://i.imgur.com/Wo0mIRI.png)

• User Stories:
</br>🐞As a player, I want a start button so that I can start playing
</br>🐞As a player, I want a message to show the safe food and a timer showing beside them to know how much time I have in each round
</br>🐞As a player, I want a the timer to be present in the left corner to keep track on the remaining time 
</br>🐞As a player, I want clear icons to show the available foods so I can choose from them 
</br>🐞As a player, I want a "next" pop up button so I know that I'm moving to the next level
</br>🐞As a player, I want a win/lose pop up message
</br>🐞As a player, I want a restart button so that I can play again
</br>🐞As a player, I want a pause button so that I can stop the round
</br>🐞As a player, I want a resume button so that I can start where I stopped
</br>🐞As a player, I want a hint button so that I can have some help when I forget the safe foods/tasks


-------------------------------------------Define constants and variables-----------------------------------------

//constant foods:[cupcake, pizza, sushi, candy, popcorn, ice-cream, pretzel, chocholate, booba];


-------------------Define the app’s state variables, but don’t assign values to them-------------------------------


// Define an array for the user's choices. To store the food item selected by the player

// Define an array for the computer's choices of random generated safe foods

// Define a variable for the game message. To show messages like "Next Level", "You Win!", "You Lose!" and the safe foods

// A const roundTimerEl to shows the remaining time for each round

// let random; varable for safe food generation 



------ (cache) elements in variables that need to be accessed in the JavaScript code more than once-------------


// let roundInterval; to save the roundTime to clear it when the player choose wrong item or time is over
// let choice to save the player's choices 

-----Add event listeners - use delegated event listeners to listen to multiple elements with a single listener-----

</br>// Add an event listener to the start button
</br>// Add an event listener to the restart button
</br>// Add an event listener to the cupcake button
</br>// Add an event listener to the ice-cream button
</br>// Add an event listener to the popcorn button
</br>// Add an event listener to the pizza button
</br>// Add an event listener to the candy button
</br>// Add an event listener to the sushi button
</br>// Add an event listener to the pretzel button
</br>// Add an event listener to the booba button
</br>// Add an event listener to the chocolate button
</br>// Add an event listener to the Novice level button
</br>// Add an event listener to the elite level button
</br>// Add an event listener to the pause button
</br>// Add an event listener to the resume button
</br>// Add an event listener to the hint button

------------Invoke the init function used to initialize all state variables----------------------------


// Using the "start" event listener set up, assign the player's choice to the variable userChoice

// Using a random generator method, assign the computer's choice to the array safeFoods[]

-------------------Wait for the user to click on a button----------------------------------

//IF the user clicks "start" button and choose a level, then start the game and enter the level function to generate the computer choice 

//Compare the player's choice with the computer's choice

//IF the player's choice is different from the computer's choice
       //"You lose" 

//IF the player's choice is the same as the computer's choice
       //You win 

//IF the player clicks the restart button 
       //Go back to the init function to start again

• Technologies Used: HTML, CSS and JavaScript

       
• Deployed Link: https://arwaaloraibi.github.io/SnackRush/



