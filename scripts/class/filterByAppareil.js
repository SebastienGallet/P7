import Filter from "./Filter.js";
class AppareilsFilter extends Filter {
  constructor(list) {
      super(list)
      this.type = 'appliances'
      
    }
  
    // Récupération de la liste des appliance.
    collect(recipes) {
      this.filtered = new Set()
      recipes.forEach(recipe => {
        recipe.appliance.split(',').forEach(appliance => {
          this.filtered.add(appliance.toLowerCase());
        });
      });
    }

    // Tri des recettes
    filter(recipes) {
        const list = [];
      
        recipes.forEach(recipe => {
          let count = 0;
          const appliances = recipe.appliance.split(','); 
          appliances.forEach(appliance => {
            if (this.selected.has(appliance.toLowerCase())) {
              count++;
            }
          });
          if (count === this.selected.size) {
            list.push(recipe);
          }
        });
      
        return list;
      }

    // barre de recherche du dropdown
    listenForInputFilter() {
      const searchBar = document.querySelector(`#searchbar-${this.type}`);
  
      searchBar.addEventListener("input", () => {
          const searchTerm = searchBar.value.trim().toLowerCase();
          let filtered = new Set();
  
          this.list.all.forEach((recipe) => {
            recipe.appliance.split(',').forEach((appliance) => {
                  if (appliance.toLowerCase().includes(searchTerm)) {
                      filtered.add(appliance);
                  }
              });
          });
  
          // Mettre à jour la liste filtered avec les ustensiles filtrés
          this.filtered = filtered;
    
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

export default AppareilsFilter