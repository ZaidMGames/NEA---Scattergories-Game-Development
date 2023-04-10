import {Category, Player, Inputs} from './classes.js';
import {chosenNumCategoriesInput, keyLetter} from './buttons.js'

//Chosen Letter Algorithm
export function chooseLetter() {
    const asciiCode = Math.floor(Math.random() * 26) + 97;
    console.log('A letter has been chosen')
    return String.fromCharCode(asciiCode- 32);
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
