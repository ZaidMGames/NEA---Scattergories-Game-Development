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
  const addCustomCategoryButton = document.getElementById('addCustomCategory');
  const customCategoriesToggle = document.getElementById('customCategoriesToggle');
  const wholeDiv = document.getElementById('wholeDiv');
  const RoundDiv = document.getElementById('Round');
  console.log(chosenTimeButton);




function toggleButtonsDisabledState(disabled) {
  chosenTimeButton.disabled = disabled;
  numOfCategoriesButton.disabled = disabled;
  changeLetterButton.disabled = disabled;
  addCustomCategoryButton.disabled = disabled;
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
    displayChosenCategories(chosenCategories)
    RoundDiv.innerHTML = '<h1> Round 1 </h1>'
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
  document.getElementById("timerText").innerHTML = '<br>';
  playButton.classList.remove('btn-danger');
  playButton.classList.add('btn-success');
  playButton.innerHTML = 'Play';
  toggleButtonsDisabledState(false)
  getAnswers()
  // wholeDiv.innerHTML = '<h1>"You have now finished the game lol. byeeeee"</h1>'
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

let customPrompt;
addCustomCategoryButton.addEventListener('click',function() {
  customPrompt = prompt('Enter a custom category ');

  while (true) {
    if (customPrompt == undefined) {
      return
    }
    if (customPrompt ==''){
      customPrompt = prompt('You can\' have a category with no letters, come on now mate');
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

let customCategories = false;

// customCategoriesToggle.addEventListener('change', function() {
//   if (this.checked) {
//     let count = 0;
//     for (let i = 0; i < ListOfCategories.length; i++) {
//       if (ListOfCategories[i].custom === true) {
//         count++;
//       }
//     }
//     if (count >= 5) {
//       customCategories = true;
//       chosenCategories = CategorySelector(ListOfCategories,  parseInt(chosenNumCategoriesInput),customCategories);
      
//     } else {
//       this.checked = false;
//       alert('You must have at least 5 custom categories.' + 'You Currently Only Have: ' + count + ' Custom Added Categories' );
//     }
//   } else {
//     customCategories = false;
//   }
// });


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
      let alertContainer = document.getElementById("alertContainer");
      let alertMessage = 'You must have at least 5 custom categories. You currently have ' + count + ' custom added categories.';
      let alertElement = document.createElement("div");
      alertElement.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
      alertElement.setAttribute("role", "alert");
      alertElement.innerHTML = `
        ${<strong>alertMessage</strong>}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertContainer.appendChild(alertElement);
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
    console.log('Timer has now been changed to '+ chosenTimer + 's')
  });

//Change number of categories Button
export let chosenNumCategoriesInput = 12;
let chosenCategories = CategorySelector(ListOfCategories, chosenNumCategoriesInput,customCategories);
console.log('Categories have been chosen')
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

//When the play Button has been pressed
playButton.addEventListener("click", function() {
  if (clicked) {
    //To run if the player presses the stop button
    stopClicked()
  } else {
    gameStarting()
    // Start the countdown timer
    stopTimer.value = false;
    countdownTimerA(!isNaN(chosenTimer) && chosenTimer > 0 ? chosenTimer : 60)
      .then(() => { //Runs only when the timer has ended
        gameEnding()
      });

    clicked = true; // just to help if player presses this button before the timer ends
    }});


 