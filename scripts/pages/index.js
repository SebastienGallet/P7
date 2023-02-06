import { getdata } from "../api/api.js";
import cardsFactory from "../factory/cards.js";
import UstensilsFilter from "../class/filterByUstensil.js";

const recipes = await getdata();
displayData(recipes)

const ustensilsFilter = new UstensilsFilter(recipes);
const filteredUstensil = ustensilsFilter.collect(recipes);
ustensilsFilter.display(filteredUstensil);
ustensilsFilter.listenForSelection(filteredUstensil);

document.querySelector("#searchbar").addEventListener("input", function() {
    let searchTerm = document.querySelector("#searchbar").value.toLowerCase();
    if(searchTerm.length >= 3) {
        let searchResults = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm)) || recipe.description.toLowerCase().includes(searchTerm));
        displayData(searchResults);
        ustensilsFilter.filterByResults(searchResults);
    }
});

export async function displayData(data) {
    const recipesSection = document.querySelector('.cards')
    recipesSection.innerHTML = '';
    data.forEach((recipe) => {
        const recipeModel = cardsFactory(recipe)
        const recipeCardDOM = recipeModel.getCardDOM()
        const article = document.createElement('article')
        article.className = 'card'
        article.innerHTML = recipeCardDOM
        recipesSection.appendChild(article)
    });

}
