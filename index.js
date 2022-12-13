//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';
//Importing all Functions from the functions file
import {countdownTimerA, chooseLetter,hydrateData} from './functions.js'



//Storing all ElementIDs
const keyLetterElement = document.getElementById("keyLetter");
const playButton = document.getElementById("playButton");
const chosenTimButton = document.getElementById('chosenTimButton')


chosenTimButton.addEventListener('click',function() {
  let chosenTimer = prompt('Choose a Timer ');
  //Continously ask the user until their input is a number
  let isNumber = /^\d+$/.test(chosenTimer);
  while (!isNumber & number) {
    chosenTimer = prompt("Time can only be set using intergers. Please enter a valid number:");
    isNumber = /^\d+$/.test(chosenTimer);
    let number = parseInt(chosenTimer);
    if (number > 300){ ///something to fix here
      chosenTimer = prompt("Time can only be less than 300s . Please enter a valid number:");
    } else{
      let number = false 
    }
  }
  
//   let number = parseInt(chosenTimer);

// // Check if the number is less than 1000
//   while (number > 1000) {
//     chosenTimer = prompt("Time can only be less than 300s . Please enter a valid number:");
//     isNumber = /^\d+$/.test(chosenTimer);
// } ;


  window.chosenTimer = chosenTimer; 
  console.log('Timer has now been changed to '+ chosenTimer + 's')
});
  
let Zaid = new Player("Zaid", 50, ["Salmon", "Football"]);
console.log(Zaid.name);


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

