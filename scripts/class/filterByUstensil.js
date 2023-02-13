class UstensilsFilter {
    constructor(recipes) {
      this.recipes = recipes;
      this.all = new Set();
      this.selected = new Set();
      this.showDropdown();
      this.hideDropdown();
      this.searchFilter();
    }
  
    // Récupération de la liste des ustensils.
    collect() {
      this.recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
          this.all.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
        });
      });
      return this.all;
      
    }

    // Création des "li" pour les ustensils.
    display(list) {
        const ustensilsList = document.querySelector("#ustensils-dropdown-content");
        ustensilsList.innerHTML = "";
        list.forEach(ustensil => {
            const li = document.createElement("li");
            li.innerHTML = ustensil;
            ustensilsList.appendChild(li);
            li.classList.add('item')
        });
    }

    // Convertir les li en minuscules pour le stocker dans tag
    listenForSelection() {
        document.querySelectorAll('.item').forEach(li =>
        {
            li.addEventListener("click", (e) => 
            {
                const tag = e.target.innerText.toLowerCase();
                // Si le tag n'est pas déjà séléctionné, ajout du tag dans la liste des ustensils.
                if (!this.selected.has(tag)) {
                  this.addToSelection(tag)
                }
                // Filtrage des recettes avec le nouveau tag
                this.filter()
            })
        })
    }
    
    //Ajout du tag recu depuis listenForSelection
    addToSelection(tag) {
        this.selected.add(tag)
        const el = document.createElement("span");
        el.classList.add("tag-ustensil");
        el.innerHTML = tag + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(el);
        el.querySelector(".delete-tag").addEventListener("click", () => {
            this.selected.delete(tag);
            el.remove();
            this.filter();
          });
        }

    // Tri des recettes
    filter() {
        // const filteredRecipes = this.recipes.filter(recipe => {
        //     return recipe.ustensils.some(ustensil => this.selected.has(ustensil.toLowerCase()));
        //   });
        //   displayData(filteredRecipes);
        

        const list = []
        console.log(list)

        this.recipes.forEach(recipe => {
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
    

    // Tri de la barre de recherche principale
    filterByResults(data) {
        let searchResults = data;
        let filteredUstensils = new Set();
        searchResults.forEach(recipe => recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil)));
        this.all = filteredUstensils;
        this.display(Array.from(filteredUstensils));
        const filteredRecipes = this.filter();
        this.display(filteredRecipes);
    }
      
    filterDropdown(recipes) {
        this.recipes = recipes;
        this.filteredUstensils = this.collect(recipes);
        this.display(this.filteredUstensils);
    }
    

    // Afficher le dropdown
    showDropdown() {
        document.querySelector("#ustensils-filter-button").addEventListener("click", () => {
            document.querySelector("#ustensils-dropdown").style.display = 'block';
            document.querySelector("#ustensils-filter-button").style.display = 'none';
        });
    }

    // Fermer le dropdown
    hideDropdown() {
        document.querySelector("#arrow-ustensils").addEventListener("click", () => {
            document.querySelector("#ustensils-filter-button").style.display = 'block';
            document.querySelector("#ustensils-dropdown").style.display = 'none';
        });
    }

    // barre de recherche du dropdown
    searchFilter() {
        const searchBar = document.querySelector("#searchbar-ustensils");
        searchBar.addEventListener("input", () => {
            let searchTerm = searchBar.value.toLowerCase();
            let filteredUstensils = Array.from(this.all).filter(ustensil => ustensil.toLowerCase().includes(searchTerm));
            this.display(filteredUstensils);
            this.listenForSelection();
        });
    }
    

}

export default UstensilsFilter