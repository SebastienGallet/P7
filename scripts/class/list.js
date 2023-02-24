import cardsFactory from "../factory/cards.js";

export default class List {
    constructor(recipes) {
        this.all = recipes
        this.filters = []
    }

    addFilter (filter){
        this.filters.push(filter);
        filter.collect(this.all)
        filter.all = filter.filtered
        filter.display()
        filter.ListenForShowDropdown()
        filter.ListenForHideDropdown()
        filter.listenForInputFilter()
        filter.listenForSelection()
    }
    
    display(recipes) {
        const recipesSection = document.querySelector('.cards')
        recipesSection.innerHTML = '';
        recipes.forEach((recipe) => {
            const recipeModel = cardsFactory(recipe)
            const recipeCardDOM = recipeModel.getCardDOM()
            const article = document.createElement('article')
            article.className = 'card'
            article.innerHTML = recipeCardDOM
            recipesSection.appendChild(article)
        });
    }

    filterRecipes() {
        let filteredRecipes = this.all;
        this.filters.forEach((filter) => {
            filteredRecipes = filter.filter(filteredRecipes);
        });
        return filteredRecipes;
    }
    
}