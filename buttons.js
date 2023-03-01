//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';
//Importing all Functions from the functions file
import {countdownTimerA, chooseLetter,hydrateData,stopTimer,displayChosenCategories,CategorySelector,ListOfCategories,createInputBoxes,getAnswers} from './functions.js'

  //Storing all ElementIDs
  const keyLetterElement = document.getElementById("keyLetter");
  const InputCategoriesElement = document.getElementById('InputCategories')
  const playButton = document.getElementById("playButton");
  const ListOfCategoriesElement = document.getElementById('ListOfCategories');
  const chosenTimeButton = document.getElementById('chosenTimeButton');
  const numOfCategoriesButton = document.getElementById('changeCategorySize');
  const changeLetterButton = document.getElementById('changeLetterButton');
  console.log(chosenTimeButton);


// Event Listner for when user wants to change length of rounds
let chosenTimer = 0;
chosenTimeButton.addEventListener('click',function() {
    chosenTimer = prompt('Choose a Timer ');
  
    while (true) {
      if (chosenTimer == undefined) {
        chosenTimer = 0;
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

      //check if Number is greater than 0
      if (number < 0) {
        chosenTimer = prompt("Time can only be a positive number. Please enter a valid number:");
        continue;
      }
  
      // If the number is greater than 300, prompt the user again
      if (number > 300) {
        chosenTimer = prompt("Time can only be less than 300s. Please enter a valid number:");
        continue;
      }
      
      // If the number is valid, break the loop
      break;
  }
  
    window.chosenTimer = parseInt(chosenTimer); 
    console.log('Timer has now been changed to '+ chosenTimer + 's')
  });

//Change number of categories Button
export let chosenNumCategoriesInput = 12;
let chosenCategories = CategorySelector(ListOfCategories, chosenNumCategoriesInput);
console.log(chosenCategories)
numOfCategoriesButton.addEventListener('click',function() {
  chosenNumCategoriesInput = prompt('How many categories would you like to play with ');

  while (true) {
    if (chosenNumCategoriesInput == undefined) {
      chosenNumCategoriesInput = 12;
      return
    }
    // Check if chosenNumCategoriesInput is a number
    // If chosenNumCategoriesInput is not a number, prompt the user again
    if (isNaN(chosenNumCategoriesInput)) {
      chosenNumCategoriesInput = prompt("The number of categories can only be set using integers. Please enter a valid number:");
      continue;
    }

    // Parse chosenNumCategoriesInput to an integer
    let number = parseInt(chosenNumCategoriesInput);

    //check if Number is greater than 0
    if (number < 0) {
      chosenNumCategoriesInput = prompt("The number of categories can only be a positive number. Please enter a valid number:");
      continue;
    }

    // If the number is greater than the number of categories we currently have, prompt the user again
    if (number > ListOfCategories.length) {
      chosenNumCategoriesInput = prompt("WE don't currently have that many categories, slow down man");
      continue;
    }
    
    // If the number is valid, break the loop
    break;
}

  window.chosenNumCategoriesInput = parseInt(chosenNumCategoriesInput); 
  chosenCategories = CategorySelector(ListOfCategories,  parseInt(chosenNumCategoriesInput));
  console.log(chosenCategories)
  console.log('The number of Selected Categories has been changed to  '+ chosenNumCategoriesInput + '')
});


//Change Letter Button
let keyLetter = ''
changeLetterButton.addEventListener("click", function(){
   let keyLetter = chooseLetter();
   if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
}})



//The Game will Only start when the button is clicked
let clicked = false

playButton.addEventListener("click", function() {
  if (clicked) {
    // Code to execute when the button is clicked again - to restart game
    console.log("Button clicked again! Game should end here");
    ListOfCategoriesElement.innerHTML = ''
    InputCategoriesElement.innerHTML = ''
    chosenTimeButton.disabled = false;
    numOfCategoriesButton.disabled = false;
    changeLetterButton.disabled = false;
    playButton.classList.remove('btn-danger');
    playButton.classList.add('btn-success');
    playButton.innerHTML = 'Play';
    clicked = false;
    stopTimer.value= true; 
    chosenCategories = CategorySelector(ListOfCategories, parseInt(chosenNumCategoriesInput));
    // stopTimer.value= true; // Set the stopTimer flag to stop the timer
  } else {

    chosenTimeButton.disabled = true;
    numOfCategoriesButton.disabled = true;
    changeLetterButton.disabled = true;

    playButton.classList.remove('btn-success');
    playButton.classList.add('btn-danger');
    playButton.innerHTML = 'Stop';

    
    // chosenCategories = CategorySelector(ListOfCategories, numOfCategories.value);
    displayChosenCategories(chosenCategories)
    createInputBoxes();
    // Start the countdown timer
    stopTimer.value = false;
    console.log('The Variable type of the timer is: ' + typeof chosenTimer)
    console.log('Confirmed Current time is '+chosenTimer)
    countdownTimerA(!isNaN(chosenTimer) && chosenTimer > 0 ? chosenTimer : 60)
      .then(() => {
          // Code to execute when the countdown finishes
          console.log("Countdown finished!");
          document.getElementById("timerText").innerHTML = '<br>';
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


 