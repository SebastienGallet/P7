import Filter from "./Filter.js";
class IngredientsFilter extends Filter {
    constructor(list) {
        super(list)
        this.type = 'ingredients'
    }
    
    // Récupération de la liste des ingredients.
    // Récupération de la liste des ingredients.
    collect(recipes) {
        this.filtered = new Set();
        recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            this.filtered.add(ingredient.ingredient.toLowerCase()); // Conversion en minuscules
            });
        });
    }


    // Tri des recettes
    filter(recipes) {
        
        const list = []
        console.log(list)

        recipes.forEach(recipe => {
            let count = 0
            recipe.ingredients.forEach(ingredient =>
                {
                    if (this.selected.has(ingredient.ingredient.toLowerCase()))
                    {
                        count++
                    }
                })
                if (count === this.selected.size) 
                {
                    list.push(recipe)
                }
        })
        return list
    }

    // barre de recherche du dropdown
    listenForInputFilter() {
        const searchBar = document.querySelector(`#searchbar-${this.type}`);

        searchBar.addEventListener("input", () => {
            const searchTerm = searchBar.value.trim().toLowerCase();
            let filtered = new Set();

            this.list.all.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => {
                    if (ingredient.ingredient.toLowerCase().includes(searchTerm)) {
                        filtered.add(ingredient.ingredient);
                    }
                });
            });

            // Mettre à jour la liste filtered avec les ustensiles filtrés
            this.filtered = filtered;
            this.display(Array.from(filtered));

            // ajout du gestionnaire d'événements click pour chaque élément de la liste des résultats de la recherche
            document.querySelectorAll(`#${this.type}-dropdown-content .item`).forEach((item) => {
                item.addEventListener("click", () => {
                    const tag = item.innerText.toLowerCase();
                });
            });
            this.listenForSelection()
            const filteredRecipes = this.list.filterRecipes();
            this.list.display(filteredRecipes);
        });
    }
    
}

export default IngredientsFilter