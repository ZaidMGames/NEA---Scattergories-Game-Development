//countdown Timer Algorithm 
export async function countdownTimerA(seconds = 60) {
    // Calculate the end time
    let endTime = Date.now() + seconds * 1000;

    // Loop until the current time is greater than or equal to the end time
    while (Date.now() < endTime) {
        // Calculate the number of seconds remaining
        let secondsRemaining = Math.round((endTime - Date.now()) / 1000);

        // Display the number of seconds remaining
        let timerDiv = document.getElementById("Timer")
        if (timerDiv) {
            timerDiv.innerHTML = secondsRemaining + 's';
          }
        console.log(secondsRemaining);

        // Pause for one second
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Display a message indicating that the countdown has finished
    console.log("Countdown finished!");
    document.getElementById("Timer").innerHTML = 'Timer Finished'
}


//Chosen Letter Algorithm
export function chooseLetter() {
    const asciiCode = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(asciiCode);
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