import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'



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
        if (secondsRemaining == 15) {
          playTimerSound()
        }
        if (secondsRemaining < 6) {
          timerText.style.color = 'red'; // change color to red
        }
      }
      console.log(secondsRemaining);


      // Pause for one second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    function playTimerSound() {
      let timerSound = new Audio('/timerSound.mp3'); 
      timerSound.play();
    }


    // Display a message indicating that the countdown has finished
    console.log("Countdown finished!");
    if (timerText) {
      timerText.innerHTML = 'Timer Finished';
      }
}


