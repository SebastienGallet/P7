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

    
    
}

export default IngredientsFilter