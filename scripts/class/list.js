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
    if (recipes.length === 0) {
      recipesSection.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.
      </p>`;
      return;
    }
    recipes.forEach((recipe) => {
      const recipeModel = cardsFactory(recipe)
      const recipeCardDOM = recipeModel.getCardDOM()
      const article = document.createElement('article')
      article.className = 'card'
      article.innerHTML = recipeCardDOM
      recipesSection.appendChild(article)
    });
  }

  filter () {
    // Filtrer les recettes avec le nouveau tag
    const filteredRecipes = this.filterRecipes();

    // Mettre à jour les dropdowns de filtres
    this.filters.forEach((filter) => {
      filter.collect(filteredRecipes);
      filter.all = filter.filtered;
      filter.display(filter.filtered);
      filter.listenForSelection();
    });

    // Filtrer les recettes avec le nouveau terme de recherche
    const searchTerm = document.querySelector("#searchbar").value.toLowerCase();
    let searchedRecipes = this.search(filteredRecipes, searchTerm);
    this.display(searchedRecipes);
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
      // Filtrer les recettes avec le nouveau terme de recherche
      const searchTerm = document.querySelector("#searchbar").value.toLowerCase();
      const caracteres = document.querySelector('.caracteres');
      let searchedRecipes;
      if (searchTerm.length >= 3) {
        searchedRecipes = this.filterRecipes();
        searchedRecipes = this.search(searchedRecipes, searchTerm);
        this.display(searchedRecipes);
        caracteres.style.display = 'none'
      } else if (searchTerm.length < 3) {
        // Afficher toutes les recettes si la barre de recherche est vide
        searchedRecipes = this.filterRecipes();
        this.display(searchedRecipes);
        caracteres.style.display = 'block'
      }
      // Mettre à jour les dropdowns de filtres
      this.updateFilters(searchedRecipes);
    });
  }

  updateFilters(recipes) {
    this.filters.forEach((filter) => {
      filter.collect(recipes);
      filter.all = filter.filtered;
      filter.display(filter.filtered);
      filter.listenForSelection();
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
}