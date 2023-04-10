import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'

let playerDictionary = {}
let chosenRoundCategoriesDic = {}



//Creates Input fields for when the round starts
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

//Function to link answers placed in input fields to an array
let playerAnswersArray = [];
const wholeBottomRow = document.getElementById('wholeBottomRow')
export function getAnswers(roundNum,roundCategories) {
  const inputBoxes = document.querySelectorAll('#InputCategories input');
  for (let i = 0; i < inputBoxes.length; i++) {
    playerAnswersArray.push(inputBoxes[i].value);
  }
  console.log('Player Answers have been appended to array')
  chosenRoundCategoriesDic[roundNum] = roundCategories;
  playerDictionary[roundNum] = playerAnswersArray;
  console.log(playerDictionary)
  console.log(chosenRoundCategoriesDic)
  console.log(playerAnswersArray)

  displayRoundInputs(roundCategories)
  playerAnswersArray = []
}

// Function to iterate over the dictionary and display the inputs after the rounds are over
export function displayRoundInputs(categoriesList) {
  const wholeDiv = document.getElementById('wholeDiv');
  const answersContainer = document.getElementById('wholeBottomRow');

  // Clear any existing content in the container
  wholeDiv.style.display = 'none'
  // Create a heading for the cards with Bootstrap styling
  const headingContainer = document.createElement('div');
  headingContainer.classList.add('container', 'mb-5');
  answersContainer.appendChild(headingContainer);
  const headingCard = document.createElement('div');
  headingCard.classList.add('card', 'bg-white', 'rounded', 'shadow-sm', 'p-3');
  headingContainer.appendChild(headingCard);
  const heading = document.createElement('h2');
  heading.classList.add('fw-bold', 'text-center', 'mb-0');
  heading.textContent = 'Here are your answers to the last couple rounds';
  headingCard.appendChild(heading);
  // Loop through each round in the dictionary
  for (const roundNumber in playerDictionary) {
    const roundInputsArray = playerDictionary[roundNumber];
    const chosenRoundCategoriesArray = chosenRoundCategoriesDic[roundNumber];
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
    roundInputsArray.forEach((input, index) => {
      const category = chosenRoundCategoriesArray[index].name;
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerHTML = `<strong>${category}</strong> <em>${input}</em> `;
      listGroup.appendChild(listItem);
    });
    // Add the completed card to the container
    answersContainer.appendChild(card);
  }

  // Create a centered button with neumorphic design
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('d-flex', 'justify-content-center', 'my-3');
  answersContainer.appendChild(buttonContainer);
  const button = document.createElement('button');
  button.textContent = 'Next Round';
  button.classList.add('btn', 'btn-dark', 'p-3', 'rounded-pill', 'neumorphic-style', 'w-100');
  button.addEventListener('click', () => {
    wholeDiv.style.display = 'block';
    answersContainer.innerHTML = '';
  });
  buttonContainer.appendChild(button);
  
  answersContainer.appendChild(button);
}