import { Category } from "./classes"

const ListOfCategories = [
  new Category("students"),
  new Category("whatever"),
  new Category("this"),
]

function CategorySelector(arr, size) {
  //The code above creates a copy of the original array, then it loops through the new array and swaps each element with a random element in the array.
  const shuffled = arr.slice(0, arr.length)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(shuffled.length, size))
}


numOfCategories = 12; //Default number of categories unless button is pressed
if (document.getElementById('changeCategorySize').onclick) {
  let input = prompt("Please input an answer"); //Category size must be higher than 5
  while(input <5 || input > listOfCategories.length){
      let input = prompt("Please input an answer");
  };
  numOfCategories = input;
}


const shuffled = CategorySelector(ListOfCategories, 12) // List of Category class instances

chosenCategories = CategorySelector(ListOfCategories, numOfCategories);
chosenCategoryDiv = document.getElementById ( "ListOfCategories " ). innerHTML = shuffled.map(c=>c.name) .join ( "<br>" ); // Display all chosen categories 

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