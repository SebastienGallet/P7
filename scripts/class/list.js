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

    filter (){
        // Filtrage des recettes avec le nouveau tag
        const filteredRecipes = this.filterRecipes();
        this.display(filteredRecipes)
        this.filters.forEach((filter) => {
            filter.collect(filteredRecipes);
            filter.display(filter.filtered)
            filter.listenForSelection()
        });
    }

    filterRecipes() {
        let filteredRecipes = this.all;
        this.filters.forEach((filter) => {
            filteredRecipes = filter.filter(filteredRecipes);
        });
        return filteredRecipes;
    }
    
    listen() {
        document.querySelector("#searchbar").addEventListener("input", () => {
            const searchTerm = document.querySelector("#searchbar").value.toLowerCase();
            let filteredRecipes = this.filterRecipes();
            filteredRecipes = this.search(filteredRecipes, searchTerm);
            this.display(filteredRecipes);
        });
        
    }

    search(recipes, needle) {
        return recipes.filter((recipe) => {
            return recipe.name.toLowerCase().includes(needle) ||
                   recipe.description.toLowerCase().includes(needle) ||
                   recipe.ingredients.some((ingredient) => {
                        return ingredient.ingredient.toLowerCase().includes(needle);
                   })
        })
    }


    // search(recipes, needle) {
    //     const result = [];
    //     for (let i = 0; i < recipes.length; i++) {
    //         if (recipes[i].name.toLowerCase().includes(needle) ||
    //             recipes[i].description.toLowerCase().includes(needle)) {
    //             result.push(recipes[i]);
    //             continue;
    //         }
    //         for (let j = 0; j < recipes[i].ingredients.length; j++) {
    //             if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(needle)) {
    //                 result.push(recipes[i]);
    //                 break;
    //             }
    //         }
    //     }
    //     return result;
    // }
    


    // updateFilters() {
    //     this.filters.forEach(filter => {
    //         filter.filtered = new Set();
    //         this.filterRecipes().forEach(recipe => {
    //             filter.collect([recipe]);
    //         });
    //         filter.display();
    //     });
    // }
    
    
}