//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';
//Importing all Functions from the functions file
import {countdownTimerA, chooseLetter,hydrateData} from './functions.js'


  //Storing all ElementIDs
  const keyLetterElement = document.getElementById("keyLetter");
  const playButton = document.getElementById("playButton");
  const chosenTimeButton = document.getElementById('chosenTimeButton')
  const numOfCategoriesButton = document.getElementById('changeCategorySize')
  console.log(chosenTimeButton);


// Event Listner for when user wants to change length of rounds
chosenTimeButton?.addEventListener('click',function() {
    let chosenTimer = prompt('Choose a Timer ');
  
    while (true) {
      if (!chosenTimer.length) {
        return
      }
      // Check if chosenTimer is a number
      // If chosenTimer is not a number, prompt the user again
      if (isNaN(chosenTimer)) {
        chosenTimer = prompt("Time can only be set using integers. Please enter a valid number:");
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
    // if (chosenTimer) {
    //   countdownTimerA(chosenTimer);
    // } else{
    //   countdownTimerA()
    // }
    countdownTimerA(!isNaN(chosenTimer) && chosenTimer > 0 ? chosenTimer : 60);
    clicked = true;

  if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
  }
  }});



  let numOfCategories = 12; //Default number of categories unless button is pressed
  if (numOfCategoriesButton.onclick) {
    let input = prompt("Please input an answer"); //Category size must be higher than 5
    while(input <5 || input > listOfCategories.length){
        let input = prompt("Please input an answer");
    };
    numOfCategories = input;
  }
  