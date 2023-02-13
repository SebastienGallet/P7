import { getdata } from "../api/api.js";
import cardsFactory from "../factory/cards.js";
import filterByUstensil from "../class/filterByUstensil.js";
import List from "../class/list.js";

const recipesData = await getdata();
const list = new List(recipesData)
list.display(list.all)


const filterUstensil = new filterByUstensil(list);
list.addFilter(filterUstensil)
// const filteredUstensil = filter.collect(recipes);
// filter.display(filteredUstensil);
// filter.listenForSelection(filteredUstensil);




// const items = document.querySelectorAll('.item');
// items.forEach(item => {
//     item.addEventListener('click', function() {
//         const filteredList = filter.filter();
//         displayData(filteredList);
//     });
// });


document.querySelector("#searchbar").addEventListener("input", function() {
    let searchTerm = document.querySelector("#searchbar").value.toLowerCase();
    if(searchTerm.length >= 3) {
        let searchResults = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm)) || recipe.description.toLowerCase().includes(searchTerm));
        displayData(searchResults);
        filter.filterByResults(searchResults);
    }
});

async function displayData(data) {
 

}