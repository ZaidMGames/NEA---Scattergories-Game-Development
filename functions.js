import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'

let playerDictionary = {}
let chosenRoundCategoriesDic = {}



//Function to validate if player inputs start with keyletter
function validInput(event) {
  event.target.value = event.target.value.length == 1 && event.target.value.toLowerCase() != keyLetter.toLowerCase() ? "" : event.target.value
}

/**
 * To create an Alert At the top of the game at all times
 * @param {string} message - The Alert Message to be displayed
 * @param {string} type - The specified type of bootstrap 5.3 alert to display from danger, warning etc
 */
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



/**
 * Shuffles an array of categories and returns a subset of a specified size.
 * @param {Array} arr - The input array of categories to shuffle.
 * @param {Number} size - The number of categories to select from the shuffled array.
 * @returns {Array} - The shuffled array of categories of size `size`.
 */
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


/**
 * Displays the chosen Categories
 * @param {Array} categoriesArray - The chosen categories list
 */
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




/**
 * CountDown Timer Algorithm
 * @param {boolean} stopTimer - variable used to stop timer when stop button is pressed
 */
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
      let timerText = document.getElementById("timerText");
      if (timerText) {
        timerText.innerHTML = secondsRemaining + 's';
        if (secondsRemaining < 11) {
          timerText.style.color = 'orange'; // change color to red
        }
        if (secondsRemaining == 10) {
          playTimerSound(10)
        }
        if (secondsRemaining < 6) {
          timerText.style.color = 'red'; // change color to red
        }
      }
      console.log(secondsRemaining);


      // Pause for one second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    function playTimerSound(givenTime) {
      let timerSound = new Audio('/timerSound.mp3'); 
      if (timerSound.duration >= givenTime) {
        timerSound.currentTime = timerSound.duration - givenTime; //plays the sound from the given time - as in the last 10s of the audio
      }
      timerSound.play();
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
  // if (roundNum ==3){
  //   for (let round in playerDictionary) {
  //     let inputs = playerDictionary[round];
  //     let inputsString = inputs.join(', ');
  //     wholeBottomRow.innerHTML += `For roaund ${round}, the following was inputed: ${inputsString}<br>`;
  //   }
  // }
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




const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

//Possible replies
const replies = [
  "Hello there!",
  "How can I help you?",
  "Nice to meet you!",
  "I'm here to assist you.",
  "What's on your mind?",
  "Sorry, I didn't understand. Could you please rephrase that?",
  "I'm not sure I can help with that. Would you like me to connect you with a human agent?",
  "Let me check on that for you.",
  "Thanks for chatting with me!",
  "Is there anything else I can help you with?",
  "Please hold on for a moment while I look into that.",
  "I'm sorry, but that feature is not currently available.",
  "Can you please provide me with more details?",
  "That's a great question. Let me get back to you on that.",
  "Thanks for your patience while I assist you.",
  "I appreciate your feedback.",
  "I'm glad I could help. Have a great day!",
  "I'm sorry to hear that. Let me see what I can do to help.",
  "I'm still learning, so please bear with me!",
  "You're welcome! It was my pleasure to assist you.",
  "A group of flamingos is called a flamboyance.",
  "The shortest war in history was between Zanzibar and Great Britain in 1896. Zanzibar surrendered after just 38 minutes.",
  "Cats have over 20 muscles that control their ears.",
  "The Hawaiian alphabet has only 12 letters.",
  "A strawberry is not a berry, but a banana is.",
  "The shortest sentence in English is 'I am.'",
  "The shortest complete sentence in English is 'Go.'",
  "The world's oldest piece of chewing gum is over 9,000 years old.",
  "A cockroach can live several weeks without its head.",
  "A sneeze can travel up to 100 miles per hour.",
];

// Index of the last reply that was generated
let lastReplyIndex = -1;

// Create array to store messages
let messages = [];

// Define messageReplies object to store reply divs for each message
const messageReplies = {};

// Function to display messages
function displayMessages() {
  // Clear chat-messages div
  chatMessages.innerHTML = "";

  // Loop through messages and append to chat-messages div
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    // Create message div and add class for styling
    const messageDiv = document.createElement("div");
    messageDiv.className = "message-box";
    messageDiv.textContent = message;

    // Check if there is already a reply for this message
    let replyDiv = messageReplies[message];
    if (!replyDiv) {
      // Generate a new reply for this message and store it in messageReplies
      const replyIndex = Math.floor(Math.random() * replies.length);
      const reply = replies[replyIndex];
      replyDiv = document.createElement("div");
      replyDiv.className = "reply-box";
      replyDiv.textContent = reply;
      messageReplies[message] = replyDiv;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.appendChild(replyDiv);
  }

  // Scroll to bottom of chat-messages div
  chatMessages.scrollTop = chatMessages.scrollHeight;
}




// Function to handle user input
function handleInput() {
  const message = userInput.value.trim();
  
  if (message !== "") {
    messages.push(message);
    displayMessages();
    userInput.value = "";
  }
}

// Event listener for send button click
sendBtn.addEventListener("click", handleInput);

// Event listener for user pressing Enter key
userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    handleInput();
  }
});

// Display initial messages
displayMessages();

