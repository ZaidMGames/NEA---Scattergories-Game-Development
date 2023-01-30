//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';
//Importing all Functions from the functions file
import {countdownTimerA, chooseLetter,hydrateData} from './functions.js'


  //Storing all ElementIDs
  const keyLetterElement = document.getElementById("keyLetter");
  const playButton = document.getElementById("playButton");
  const chosenTimeButton = document.getElementById('chosenTimeButton')


// Event Listner for when user wants to change length of rounds
chosenTimeButton.addEventListener('click',function() {
    let chosenTimer = prompt('Choose a Timer ');
  
    while (true) {
      // Check if chosenTimer is a number
      let isNumber = /^\d+$/.test(chosenTimer);
  
      // If chosenTimer is not a number, prompt the user again
      if (!isNumber) {
        chosenTimer = prompt("Time can only be set using intergers. Please enter a valid number:");
        continue;
      }
  
      // Parse chosenTimer to an integer
      let number = parseInt(chosenTimer);
  
      // If the number is greater than 300, prompt the user again
      if (number > 300) {
        chosenTimer = prompt("Time can only be less than 300s. Please enter a valid number:");
        continue;
      }
      
      // If the number is valid, break the loop
      break;
  }
  
    window.chosenTimer = chosenTimer; 
    console.log('Timer has now been changed to '+ chosenTimer + 's')
  });





  //The Game will Only start when the button is clicked
let clicked = false

playButton.addEventListener("click", function() {
  if (clicked) {
    // Code to execute when the button is clicked again - to restart game
    console.log("Button clicked again! Game should end here");
  } else {
    // Code to execute when the button is clicked for the first time
      // Choose a letter
    const keyLetter = chooseLetter();
    //Start Countdown 
    if (typeof chosenTimer !== "undefined") {
      countdownTimerA(chosenTimer);
    } else{
      countdownTimerA()
    }
    clicked = true;

  if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
  }
  }});



