
const inputEle= document.getElementById('input')
const bodyDiv = document.getElementById('allRecipes')

let randomFood = document.getElementsByClassName("random")
let randomizedDiv = document.getElementById("randomizedDiv")
let ul = document.getElementById("ul")
let popup = document.getElementById("popup")

const searchResults = document.getElementById("search-results")
let searchedItem = document.getElementById("searcheditem")


// Search by Name function
function searchByNameAsync(searchValue){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
    .then((res)=> res.json())
    .then((data)=> appendDataWithHtml(data.meals))
    .catch((err)=> console.log('There is an error occured',err))
}

// Search by category
function category(clickedElement) {
    var anchorText = clickedElement.textContent;
    searchByNameAsync(anchorText)
    searchedItem.innerHTML = `PALATE QUEST:  <span id="changesearchcolor">${anchorText}</span>` 
    searchResults.scrollIntoView({ behavior: "smooth" })
}


function handleEnterKey(event) {
    if (event.key === 'Enter') {
       
        var inputValue = inputEle.value.trim();
        
        if (inputValue !== '') {
            searchByNameAsync(inputValue);
        }
        searchedItem.innerHTML = `PALATE QUEST:  <span id="changesearchcolor">${inputValue}</span>` 
        searchResults.scrollIntoView({ behavior: "smooth" });
    }

}

inputEle.addEventListener('keydown', handleEnterKey)



// Appending data in html
function appendDataWithHtml(data){
    bodyDiv.innerHTML=" "

    for(let i = 0; i < data.length; i++){
        createHtml(data[i])
    }
}


function createHtml(singleMeal){
    let div = document.createElement("div");
    div.classList.add("recipes");
    
    let image = document.createElement('img');
    image.classList.add("recipe-img");
    image.src = singleMeal.strMealThumb;
    
    let name = document.createElement('h3');
    name.classList.add("recipe-name");
    let nameText = document.createTextNode(singleMeal.strMeal);
    name.appendChild(nameText);

    div.append(image, name);
    bodyDiv.append(div);
}


// Random meal function.

function randomizeTheMeals(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        appendRandomMeal(data.meals[0])
    })
    .catch((error)=>console.log("An error occured, Please check the code.",error))
}

randomizeTheMeals()

function appendRandomMeal(randomized) {

    let randomizedImage = document.createElement("img");
    randomizedImage.classList.add("randomized-image");
    randomizedImage.src = randomized.strMealThumb;

    console.log(randomized.strCategory)

    let randomizedRecipeName = document.createElement("h2");
    randomizedRecipeName.classList.add("randomized-meal-name");
    randomizedRecipeName.innerText = randomized.strMeal;

    let randomizedInstructions = document.getElementById("intructions")
    
    
    
     
    let ingredientsList = '';

    for (let i = 1; i <= 20; i++) {
        let ingredients = randomized[`strIngredient${i}`];
        if (ingredients) {
            ingredientsList += `<li>${ingredients}</li>`;
        }
        randomizedInstructions.innerText = `${randomized.strInstructions}`
    }
    
    ul.innerHTML =`${ingredientsList}`;
    
    
    randomizedDiv.append(randomizedImage,randomizedRecipeName);   
    popup.innerHTML= `<h2 id="popup-heading">Ingredients and Procedures</h2>`
    popup.append(ul,randomizedInstructions)
}

randomizedDiv.addEventListener("click",()=>{
    console.log(1)
})




// Function to show the popup
function showPopup() {
    popup.style.display = 'block';
}


// Event listener to open the popup
randomizedDiv.addEventListener('click', () => {
    showPopup()
    const closeBtn = document.getElementById("closeBtn")
    closeBtn.style.display = "inherit"
});



closeBtn.addEventListener("click", () => {
    popup.style.display = "none"
    closeBtn.style.display = "none"
})

// Category Function




// Image changer

var index = 0;
change();

function change() {
    var x = document.getElementsByClassName('slides');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].style.opacity = 0; // Set opacity to 0
    }
    index++;
    if (index > x.length) {
        index = 1;
    }
    x[index - 1].style.display = "block";
    x[index - 1].style.opacity = 1; // Set opacity to 1 for the current slide
    setTimeout(change, 4000);
}
