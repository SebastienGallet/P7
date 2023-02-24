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

    // barre de recherche du dropdown
    listenForInputFilter() {
        const searchBar = document.querySelector(`#searchbar-${this.type}`);
      
        searchBar.addEventListener("input", () => {
          const searchTerm = searchBar.value.trim().toLowerCase();
          let filtered = new Set();
      
          this.list.all.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
              if (ustensil.toLowerCase().includes(searchTerm)) {
                filtered.add(ustensil.toLowerCase()); // uniformisation de la casse
              }
            });
          });
      
          this.filtered = filtered; // mise à jour de l'ensemble filtré
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

export default UstensilsFilter