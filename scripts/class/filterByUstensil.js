import Filter from "./Filter.js";
class UstensilsFilter extends Filter {
    constructor(list) {
        super(list)
        this.type = 'ustensils'
    }
  
    // Récupération de la liste des ustensils.
    collect(recipes) {
        this.filtered = new Set();
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
            this.filtered.add(ustensil.toLowerCase());
            });
        });
    }

   
    // Tri des recettes
    filter(recipes) {
        
        const list = []
        console.log(list)

        recipes.forEach(recipe => {
            let count = 0
            recipe.ustensils.forEach(ustensil =>
                {
                    if (this.selected.has(ustensil.toLowerCase()))
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

export default UstensilsFilter