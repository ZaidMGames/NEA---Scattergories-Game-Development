//Importing All Classes from the classes file
import {Category, Player, Inputs} from './classes.js';

//Importing any functions from the functions file
import {alert} from './functions.js'

// Import timer-related functions from timer.js
import { countdownTimerA, stopTimer } from './timer.js';

// Import category-related functions from category.js
import { chooseLetter, hydrateData, displayChosenCategories, CategorySelector } from './category.js';

// Import input-related functions from input.js
import { createInputBoxes, getAnswers, displayRoundInputs } from './input.js';

//importing the list of cateogries
import {ListOfCategories} from './categoriesList.js'

let Zaid = new Player("Zaid")
let players = [Zaid]



export let chosenNumCategoriesInput = 12;
let chosenCategories;

  //Storing all ElementIDs
  const keyLetterElement = document.getElementById("keyLetter"); //where key letter is displayed
  const InputCategoriesElement = document.getElementById('InputCategories') // contianer where input boxes are displayed
  const playButton = document.getElementById("playButton"); //containter where play button is shown
  const ListOfCategoriesElement = document.getElementById('ListOfCategories'); //container where categories are displayed 
  const chosenTimeButton = document.getElementById('chosenTimeButton'); //container with change time button
  const numOfCategoriesButton = document.getElementById('changeCategorySize'); //contianer where the number of categories is displayed
  const changeLetterButton = document.getElementById('changeLetterButton'); //container where the chagne letter button is displayed
  const addCustomCategoryButton = document.getElementById('addCustomCategory');
  const customCategoriesToggle = document.getElementById('customCategoriesToggle'); //container with custom categories button
  const answersContainer = document.getElementById('wholeBottomRow');
  const showAnswersButton = document.getElementById('showAnswersButton');
  const wholeDiv = document.getElementById('wholeDiv'); // this div contains everything on the main screen
  const RoundDiv = document.getElementById('Round'); //just the container with the round number
  console.log(chosenTimeButton);
  let roundNumber = 0;



//function used for disabling buttons or activating them during round and outside round respectfully 
function toggleButtonsDisabledState(disabled) {
  chosenTimeButton.disabled = disabled;
  numOfCategoriesButton.disabled = disabled;
  changeLetterButton.disabled = disabled;
  addCustomCategoryButton.disabled = disabled;
  showAnswersButton.disabled = disabled;
}

function gameStarting(){
  //code to execute when the game is starting
    //Disabiling ability to use buttons during game
    toggleButtonsDisabledState(true)
    // To change the play button
    playButton.classList.remove('btn-success');
    playButton.classList.add('btn-danger');
    playButton.innerHTML = 'Stop';
    //To display the categories
    chosenCategories = CategorySelector(ListOfCategories, parseInt(chosenNumCategoriesInput),customCategories);
    displayChosenCategories(chosenCategories)
    roundNumber += 1;
    RoundDiv.innerHTML = `<h1> Round ${roundNumber} </h1>`
    //To display chosen letter
    if (keyLetter == ''){
      keyLetter = chooseLetter();
    }
    if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
    }
    
    createInputBoxes(); //Creating input fields for players to answer - dependent on size of categories chosen

}

function gameEnding(){
  // Code to execute when the countdown finishes
  console.log("Countdown finished!");
  clicked = false;
  console.log(`these should be the shown categories ${chosenCategories}`)
  getAnswers(roundNumber,chosenCategories)
  ListOfCategoriesElement.innerHTML = ''
  InputCategoriesElement.innerHTML = ''
  document.getElementById("timerText").innerHTML = '<br>';
  playButton.classList.remove('btn-danger');
  playButton.classList.add('btn-success');
  playButton.innerHTML = 'Play';
  toggleButtonsDisabledState(false)
}

function stopClicked() {
      // Code to execute when the button is clicked again - to restart game
      console.log("Button clicked again! Game should end here");
      ListOfCategoriesElement.innerHTML = ''
      InputCategoriesElement.innerHTML = ''
      toggleButtonsDisabledState(false)
      playButton.classList.remove('btn-danger');
      playButton.classList.add('btn-success');
      playButton.innerHTML = 'Play';
      clicked = false;
      stopTimer.value= true; 
    chosenCategories = CategorySelector(ListOfCategories, parseInt(chosenNumCategoriesInput),customCategories);
}

// This is the function for adding a new custom category
let customPrompt;
addCustomCategoryButton.addEventListener('click',function() {
  customPrompt = prompt('Enter a custom category ');

  while (true) {
    if (customPrompt == undefined) {
      return
    }
    if (customPrompt ==''){
      customPrompt = prompt('You can\'t have a category with no letters, come on now mate');
      return
    }
    const categoryExists = ListOfCategories.some(category => category.name.toLowerCase() === customPrompt.toLowerCase());
    if (!categoryExists) {
      ListOfCategories.push(new Category(customPrompt.charAt(0).toUpperCase() + customPrompt.slice(1).toLowerCase(), true));
      console.log(`New category added: ${customPrompt.charAt(0).toUpperCase() + customPrompt.slice(1).toLowerCase()}`);
      continue
    } else {
      console.log(`The category "${customPrompt}" already exists in the list.`);
      customPrompt = prompt('Enter a custom category, I already have it '+ customPrompt);
      continue
    }
}});

//Function to toggle custom categories only
let customCategories = false;
customCategoriesToggle.addEventListener('change', function() {
  if (this.checked) {
    let count = 0;
    for (let i = 0; i < ListOfCategories.length; i++) {
      if (ListOfCategories[i].custom === true) {
        count++;
      }
    }
    if (count >= 5) {
      customCategories = true;
      chosenCategories = CategorySelector(ListOfCategories,  parseInt(chosenNumCategoriesInput),customCategories);
    } else {
      this.checked = false;
      alert('You must have at <strong>least 5 custom categories</strong>. You currently have ' + count + ' custom added categories.','danger')
    }
  } else {
    customCategories = false;
  }
});



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

      //If number == 0
      if (number == 0) {
        chosenTimer = prompt("You can't possibly answer all the categories in 0s, you're not the flash mate");
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
    console.log(`Timer has now been changed to ${chosenTimer}s`)
    alert(`Timer has now been changed to <strong>${chosenTimer}s</strong>`,'dark')
  });

//Change number of categories Button
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

    //If number is = 0
    if (number == 0) {
      chosenNumCategoriesInput = prompt("The number of categories Must be greater than 0, Come on now, you can't play the category game without any categories");
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
  chosenCategories = CategorySelector(ListOfCategories,  parseInt(chosenNumCategoriesInput),customCategories);
  console.log(chosenCategories)
  console.log('The number of Selected Categories has been changed to  '+ chosenNumCategoriesInput + '')
  alert(`The number of Selected Categories has now been changed to <strong>${chosenNumCategoriesInput}</strong>`,'info')
});


//Change Letter Button
export let keyLetter = ''
changeLetterButton.addEventListener("click", function(){
  keyLetter = chooseLetter();
   if (keyLetterElement) {
    keyLetterElement.innerHTML = keyLetter;
}})



//The Game will Only start when the button is clicked
let clicked = false

// //When the play Button has been pressed

function handlePlayButtonClick() {
  if (clicked) {
    stopClicked()
  } else {
    gameStarting()
    startTimer()
    clicked = true;
  }
}

//function to validate starting the timer
function startTimer() {
  stopTimer.value = false;
  countdownTimerA(!isNaN(chosenTimer) && chosenTimer > 0 ? chosenTimer : 60)
    .then(() => {
      gameEnding()
    });
}


playButton.addEventListener("click", handlePlayButtonClick);






showAnswersButton.addEventListener('click', () => {
  displayRoundInputs(chosenCategories)
});

