class UstensilsFilter {
    constructor(list) {
      this.list = list;
      this.all = new Set();
      this.selected = new Set();
      this.type = 'ustensils'
    }
  
    // Récupération de la liste des ustensils.
    collect() {
      this.list.all.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
          this.all.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
        });
      });
    }

    // Création des "li" pour les ustensils.
    display() {
        const list = document.querySelector(`#${this.type}-dropdown-content`);
        list.innerHTML = "";
        this.all.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = item;
            list.appendChild(li);
            li.classList.add('item');
            li.addEventListener("click", (e) => {
                const tag = e.target.innerText.toLowerCase();

                this.selected.add(tag);
                this.displaySelection(tag);
                // Filtrage des recettes avec le nouveau tag
                const filteredRecipes = this.list.filterRecipes();
                this.list.display(filteredRecipes);
                this.listerForUnselect(tag);
            });
        });
    }

    // Convertir les li en minuscules pour le stocker dans tag
    listenForSelection() {
        document.querySelectorAll(`#${this.type}-dropdown .item`).forEach(li =>
        {
            li.addEventListener("click", (e) => 
            {
                const tag = e.target.innerText.toLowerCase();

                this.selected.add(tag)
                this.displaySelection(tag)
                // Filtrage des recettes avec le nouveau tag
                const filteredRecipes = this.list.filterRecipes();
                this.list.display(filteredRecipes)
                this.listerForUnselect(tag)
            })
        })
    }


    displaySelection(tag) {
        const el = document.createElement("span");
        el.classList.add(`tag-${this.type}`);
        el.dataset.value = tag;
        el.innerHTML = tag + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(el);
    }

    listerForUnselect (tag) {
        const tagEl = document.querySelector(`.tag-${this.type}[data-value="${tag}"]`)
        tagEl.querySelector('.delete-tag').addEventListener("click", (e) => {
            this.selected.delete(tag);
            tagEl.remove();
            const filteredRecipes = this.list.filterRecipes();
            this.list.display(filteredRecipes)
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
    

    // Tri de la barre de recherche principale
    filterByResults(data) {
        let searchResults = data;
        let filtered = new Set();
        searchResults.forEach(recipe => recipe.ustensils.forEach(ustensil => filtered.add(ustensil)));
        this.all = filtered;
        this.display(Array.from(filtered));
        const filteredRecipes = this.filter();
        this.display(filteredRecipes);
    }
        

    // Afficher le dropdown
    ListenForShowDropdown() {
        document.querySelector(`#${this.type}-filter-button`).addEventListener("click", () => {
            document.querySelector(`#${this.type}-dropdown`).style.display = 'block';
            document.querySelector(`#${this.type}-filter-button`).style.display = 'none';
        });
    }

    // Fermer le dropdown
    ListenForHideDropdown() {
        document.querySelector(`#arrow-${this.type}`).addEventListener("click", () => {
            document.querySelector(`#${this.type}-filter-button`).style.display = 'block';
            document.querySelector(`#${this.type}-dropdown`).style.display = 'none';
        });
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
                        filtered.add(ustensil);
                    }
                });
            });
    
            this.all = filtered;
            this.display(Array.from(filtered));
    
            const filteredRecipes = this.list.filterRecipes();
            this.list.display(filteredRecipes);
        });
    }
    

}

export default UstensilsFilter