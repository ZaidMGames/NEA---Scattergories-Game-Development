import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'


export const ListOfCategories = [
  new Category("Football Team"),
  new Category("Anime"),
  new Category("Car Brand"),
  new Category("School Subject"),
  new Category("Country"),
  new Category("Sport"),
  new Category("zfdf"),
  new Category("whaasdfdfstever"),
  new Category("this"),
  new Category("studesafdasdfnts"),
  new Category("whatever"),
  new Category("thisdffds"),
  new Category("studeasdfsnts"),
  new Category("whsfasdfsdftever"),
  new Category("thissdf"),
]

/**
 * Shuffles an array of categories and returns a subset of a specified size.
 * @param {Array} arr - The input array of categories to shuffle.
 * @param {Number} size - The number of categories to select from the shuffled array.
 * @returns {Array} - The shuffled array of categories of size `size`.
 */

export function CategorySelector(arr, size) {
  //The code above creates a copy of the original array, then it loops through the new array and swaps each element with a random element in the array.
  if (!Array.isArray(arr)) {
    throw new TypeError('Input parameter `arr` must be an array.')
  }

  if (typeof size !== 'number' || size < 0) {
    throw new TypeError('Input parameter `size` must be a non-negative number.')
  }

  const shuffled = arr.slice(0, arr.length)
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled.slice(0, Math.min(shuffled.length, size))
}

//Function to display the chosen categories from the category selector 
export function displayChosenCategories(categories) {
    const objectNamesElement = document.getElementById("ListOfCategories");
    categories.forEach(category => {
      const objectNameElement = document.createElement("div");
      objectNameElement.classList.add("my-2");
      objectNameElement.innerHTML = '<h3>' + category.name + '</h3>';
      objectNamesElement.appendChild(objectNameElement);
    });
  }
//Function to create Input boxes for players to give answers to categories
export function createInputBoxes() {
  console.log('Creating input boxes')
    const inputBoxesDiv = document.getElementById('InputCategories');
    for (let i = 0; i < chosenNumCategoriesInput; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = keyLetter + '...'
      input.classList.add('form-control');
      inputBoxesDiv.appendChild(input);
      const lineBreak = document.createElement('br');
      inputBoxesDiv.appendChild(lineBreak);
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
const playerAnswersArray = [];
export function getAnswers() {
  const inputBoxes = document.querySelectorAll('#InputCategories input');
  for (let i = 0; i < inputBoxes.length; i++) {
    playerAnswersArray.push(inputBoxes[i].value);
  }
  console.log('Player Answers have been appended to array')
  console.log(playerAnswersArray)
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




