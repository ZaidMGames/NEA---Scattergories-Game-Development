import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'

let playerDictionary = {}
let chosenRoundCategoriesDic = {}



//Function to validate if player inputs start with keyletter
export function validInput(event) {
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



//These are all for the chat interface

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

