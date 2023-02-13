class UstensilsFilter {
    constructor(list) {
      this.list = list;
      this.all = new Set();
      this.selected = new Set();
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
        const ustensilsList = document.querySelector("#ustensils-dropdown-content");
        ustensilsList.innerHTML = "";
        this.all.forEach(ustensil => {
            const li = document.createElement("li");
            li.innerHTML = ustensil;
            ustensilsList.appendChild(li);
            li.classList.add('item')
        });
    }

    // Convertir les li en minuscules pour le stocker dans tag
    listenForSelection() {
        document.querySelectorAll('#ustensils-dropdown .item').forEach(li =>
        {
            li.addEventListener("click", (e) => 
            {
                const tag = e.target.innerText.toLowerCase();

                this.selected.add(tag)
                this.displaySelection(tag)
                // Filtrage des recettes avec le nouveau tag
                const filteredRecipes = this.filter(this.list.all);
                this.list.display(filteredRecipes)
                this.listerForUnselect(tag)
            })
        })
    }


    displaySelection(tag) {
        const el = document.createElement("span");
        el.classList.add("tag-ustensil");
        el.dataset.value = tag;
        el.innerHTML = tag + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(el);
    }

    listerForUnselect (tag) {
        const tagEl = document.querySelector(`.tag-ustensil[data-value="${tag}"]`)
        tagEl.querySelector('.delete-tag').addEventListener("click", (e) => {
            this.selected.delete(tag);
            tagEl.remove();
            const filteredRecipes = this.filter(this.list.all);
            this.list.display(filteredRecipes)
          });
    }

    // Tri des recettes
    filter(recipes) {
        // const filteredRecipes = this.list.filter(recipe => {
        //     return recipe.ustensils.some(ustensil => this.selected.has(ustensil.toLowerCase()));
        //   });
        //   displayData(filteredRecipes);
        

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
        let filteredUstensils = new Set();
        searchResults.forEach(recipe => recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil)));
        this.all = filteredUstensils;
        this.display(Array.from(filteredUstensils));
        const filteredRecipes = this.filter();
        this.display(filteredRecipes);
    }
        

    // Afficher le dropdown
    ListenForShowDropdown() {
        document.querySelector("#ustensils-filter-button").addEventListener("click", () => {
            document.querySelector("#ustensils-dropdown").style.display = 'block';
            document.querySelector("#ustensils-filter-button").style.display = 'none';
        });
    }

    // Fermer le dropdown
    ListenForHideDropdown() {
        document.querySelector("#arrow-ustensils").addEventListener("click", () => {
            document.querySelector("#ustensils-filter-button").style.display = 'block';
            document.querySelector("#ustensils-dropdown").style.display = 'none';
        });
    }

    // barre de recherche du dropdown
    listenForInputFilter() {
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