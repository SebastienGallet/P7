import { getdata } from "../api/api.js";
import filterByIngredient from "../class/filterByIngredient.js";
import filterByUstensil from "../class/filterByUstensil.js";
import filterByAppareil from "../class/filterByAppareil.js";
import List from "../class/list.js";

const recipesData = await getdata();
const list = new List(recipesData)
list.display(list.all)

const filterAppareil = new filterByAppareil(list);
list.addFilter(filterAppareil)

const filterIngredient = new filterByIngredient(list);
filterIngredient.listenForInputFilter()
list.addFilter(filterIngredient)

const filterUstensil = new filterByUstensil(list);
filterUstensil.listenForInputFilter();
list.addFilter(filterUstensil)



document.querySelector("#searchbar").addEventListener("input", function() {
    let searchTerm = document.querySelector("#searchbar").value.toLowerCase();
    if(searchTerm.length >= 3) {
        let searchResults = list.all.filter(recipe => recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm)) || recipe.description.toLowerCase().includes(searchTerm));
        displayData(searchResults);
        filter.filterByResults(searchResults);
    }
});
