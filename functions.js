import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'

let playerDictionary = {}



export const ListOfCategories = [
  new Category("Football Team"),
  new Category("Anime"),
  new Category("Capital City"),
  new Category("Animal"),
  new Category("Cartoon Character"),
  new Category("Four Letter Word"),
  new Category("Brand"),
  new Category("Things on a beach"),
  new Category("Website"),
  new Category("Fruit"),
  new Category("Pet Peeve"),
  new Category("Ice Cream Flavor"),
  new Category("Job Tittle"),
  new Category("Language"),
  new Category("Celebrity name"),
  new Category("Fear"),
  new Category("Things in a classroom"),
  new Category("Song title"),
  new Category("Item within eyesight"),
  new Category("A Common Lie"),
  new Category("Video Game"),
  
]

/**
 * Shuffles an array of categories and returns a subset of a specified size.
 * @param {Array} arr - The input array of categories to shuffle.
 * @param {Number} size - The number of categories to select from the shuffled array.
 * @returns {Array} - The shuffled array of categories of size `size`.
 */

//Function to validate if player inputs start with keyletter
function validInput(event) {
  event.target.value = event.target.value.length == 1 && event.target.value.toLowerCase() != keyLetter.toLowerCase() ? "" : event.target.value
}

export const alert = (message,type) => {
  let alertContainer = document.getElementById("alertContainer");
  const alertElement = document.createElement('div')
      alertElement.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show");
      alertElement.setAttribute("role", "alert");
      alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertContainer.appendChild(alertElement);
}





export function CategorySelector(arr, size, custom) {   
  if (!Array.isArray(arr)) {     
    throw new TypeError('Input parameter `arr` must be an array.')   
  } 
  if (typeof size !== 'number' || size < 0) {     
    throw new TypeError('Input parameter `size` must be a non-negative number.')   
  } 
  const filteredArr = custom ? arr.filter(obj => obj.custom === true) : arr;  const shuffled = filteredArr.slice(0, filteredArr.length);
  for (let i = shuffled.length - 1; i > 0; i--) {     let j = Math.floor(Math.random() * (i + 1))     
    const temp = shuffled[i];     
    shuffled[i] = shuffled[j];     
    shuffled[j] = temp;   } 
  return shuffled.slice(0, Math.min(shuffled.length, size)) }



let numberOfCategoriesDisplayed;
export function displayChosenCategories(categoriesArray) {
  const ListOfCategoriesDiv = document.getElementById("ListOfCategories");
  categoriesArray.forEach(category => {
    const objectNameElement = document.createElement("div");
    objectNameElement.classList.add("neumorphic-category");
    objectNameElement.innerHTML = `<h3>
                                    <img src="./Icons/magnifying.svg" alt="search" class="search-icon img-fluid" onclick="window.open('${category.link}', '_blank').focus()"/>
                                    ${category.name}</h3>`;      
    ListOfCategoriesDiv.appendChild(objectNameElement);
  });
  let h3Tags = ListOfCategoriesDiv.getElementsByTagName("h3")
  numberOfCategoriesDisplayed = h3Tags.length
  console.log('The Number of categories displayed overall is '+ numberOfCategoriesDisplayed)
}


export function createInputBoxes() {
  console.log('Creating input boxes');
  const inputBoxesDiv = document.getElementById('InputCategories');
  for (let i = 0; i < numberOfCategoriesDisplayed; i++) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const input = document.createElement('input');
    input.addEventListener('input', validInput);
    input.type = 'text';
    input.placeholder = keyLetter + '...';
    input.classList.add('form-control', 'neumorphic-input');
    
    inputContainer.appendChild(input);
    inputBoxesDiv.appendChild(inputContainer);
  }
}





export function roundStarter() {
  
}



//countdown Timer Algorithm 
export const stopTimer = { value: false }; // variable used to stop timer when stop button is pressed
console.log(stopTimer)
export async function countdownTimerA(seconds) {
    // Calculate the end time
    let endTime = Date.now() + seconds * 1000;

    // Loop until the current time is greater than or equal to the end time
    while (Date.now() < endTime) {
      // Exit early if the stop button has been clicked
      if (stopTimer.value) {
            console.log('Timer has now been stopped')
            return;
        }
      // Calculate the number of seconds remaining
      let secondsRemaining = Math.round((endTime - Date.now()) / 1000);

      // Display the number of seconds remaining
      let timerText = document.getElementById("timerText")
      if (timerText) {
        timerText.innerHTML = secondsRemaining + 's';
        }
      console.log(secondsRemaining);

      // Pause for one second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Display a message indicating that the countdown has finished
    console.log("Countdown finished!");
    if (timerText) {
      timerText.innerHTML = 'Timer Finished';
      }
}


//Chosen Letter Algorithm
export function chooseLetter() {
    const asciiCode = Math.floor(Math.random() * 26) + 97;
    console.log('A letter has been chosen')
    return String.fromCharCode(asciiCode- 32);
  }



//Function to link answers placed in input fields to an array
let playerAnswersArray = [];
const wholeBottomRow = document.getElementById('wholeBottomRow')
export function getAnswers(roundNum) {
  const inputBoxes = document.querySelectorAll('#InputCategories input');
  for (let i = 0; i < inputBoxes.length; i++) {
    playerAnswersArray.push(inputBoxes[i].value);
  }
  console.log('Player Answers have been appended to array')
  playerDictionary[roundNum] = playerAnswersArray
  console.log(playerDictionary)
  console.log(playerAnswersArray)
  // if (roundNum ==3){
  //   for (let round in playerDictionary) {
  //     let inputs = playerDictionary[round];
  //     let inputsString = inputs.join(', ');
  //     wholeBottomRow.innerHTML += `For round ${round}, the following was inputed: ${inputsString}<br>`;
  //   }
  // }
  if (roundNum == 3){
  // Call the displayRoundInputs function when the page has finished loading
  document.addEventListener('DOMContentLoaded', displayRoundInputs);
  }
  playerAnswersArray = []
}

// Function to iterate over the dictionary and display the inputs in a Bootstrap card
function displayRoundInputs() {
  const container = document.getElementById('wholeBottomRow');

  // Clear any existing content in the container
  container.innerHTML = '';

  // Loop through each round in the dictionary
  for (const roundNumber in playerDictionary) {
    const roundInputsArray = playerDictionary[roundNumber];

    // Create a Bootstrap card for the round
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Add the card header with the round number
    const header = document.createElement('div');
    header.classList.add('card-header');
    header.textContent = `Round ${roundNumber}`;
    card.appendChild(header);

    // Create a list group for the inputs in the round
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'list-group-flush');
    card.appendChild(listGroup);

    // Add each input in the round to the list group
    roundInputsArray.forEach(input => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = input;
      listGroup.appendChild(listItem);
    });

    // Add the completed card to the container
    container.appendChild(card);
  }
}






  //Hydrate data algorithm
export function hydrateData(players, categories) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      for (const player of players) {
        const answer = player.answers[i]
        const input = new Inputs(player, answer, category.name)
        category.answers[player.name] = input
      }
  
      // filter out duplicates - REMOVE BOTH DUPLICATES
      let entries = Object.entries(category.answers)
          .map(([key, value]) => {
            return ([key, value.answer])
          }) // make 2D array of answers from { playername: answer (string) }
  
      // loop through key and value of new 2D array
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i]
        // if index of loop != FIRST index of occurence in list,
        // must be a duplicate, use filter to remove all
        if (i != entries.map(([k,v]) => v).indexOf(value)) {
           entries = entries.filter(([k,v]) => v != value) 
        }
      }
  
      category.answers = Object.fromEntries(entries)
    }
  }




