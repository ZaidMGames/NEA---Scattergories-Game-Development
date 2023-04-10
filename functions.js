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
