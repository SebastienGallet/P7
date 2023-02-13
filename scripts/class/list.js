import cardsFactory from "../factory/cards.js";

export default class List {
    constructor(recipes) {
        this.all = recipes
        this.filter = []
    }

    addFilter (filter){
        this.filter.push(filter);
        filter.collect()
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

}