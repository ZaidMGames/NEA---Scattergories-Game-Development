//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';
//Importing all Functions from the functions file
import {countdownTimerA, chooseLetter,hydrateData,stopTimer} from './functions.js'


  //Storing all ElementIDs
  const keyLetterElement = document.getElementById("keyLetter");
  const playButton = document.getElementById("playButton");
  const chosenTimeButton = document.getElementById('chosenTimeButton')
  const numOfCategoriesButton = document.getElementById('changeCategorySize')
  const changeLetterButton = document.getElementById('changeLetterButton')
  console.log(chosenTimeButton);


// Event Listner for when user wants to change length of rounds
let chosenTimer = 0
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



  let keyLetter = ''

  if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
  }

changeLetterButton.addEventListener("click", function(){
   keyLetter = chooseLetter();
   if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
}})






  //The Game will Only start when the button is clicked
let clicked = false

playButton.addEventListener("click", function() {
  if (clicked) {
    // Code to execute when the button is clicked again - to restart game
    console.log("Button clicked again! Game should end here");
    chosenTimeButton.disabled = false;
    numOfCategoriesButton.disabled = false;
    changeLetterButton.disabled = false;
    playButton.classList.remove('btn-danger');
    playButton.classList.add('btn-success');
    playButton.innerHTML = 'Play';
    clicked = false;
    stopTimer= true; 
    // stopTimer.value= true; // Set the stopTimer flag to stop the timer
  } else {

    chosenTimeButton.disabled = true;
    numOfCategoriesButton.disabled = true;
    changeLetterButton.disabled = true;

    playButton.classList.remove('btn-success');
    playButton.classList.add('btn-danger');
    playButton.innerHTML = 'Stop';

    // Start the countdown timer
    stopTimer= false; 
    countdownTimerA(!isNaN(chosenTimer) && chosenTimer > 0 ? chosenTimer : 60)
      .then(() => {
          // Code to execute when the countdown finishes
          console.log("Countdown finished!");
          document.getElementById("Timer").innerHTML = 'Timer Finished';
          playButton.classList.remove('btn-danger');
          playButton.classList.add('btn-success');
          playButton.innerHTML = 'Play';
          chosenTimeButton.disabled = false;
          numOfCategoriesButton.disabled = false;
          changeLetterButton.disabled = false;
      });

    clicked = true;
    if (keyLetter == ''){
      keyLetter = chooseLetter();
   if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
    }
  }}});



  let numOfCategories = 12; //Default number of categories unless button is pressed
  if (numOfCategoriesButton.onclick) {
    let input = prompt("Please input an answer"); //Category size must be higher than 5
    while(input <5 || input > listOfCategories.length){
        let input = prompt("Please input an answer");
    };
    numOfCategories = input;
  }
  