class Filter {
    constructor(list) {
        this.list = list;
        this.all = new Set();
        this.filtered = new Set();
        this.selected = new Set();
    }
  


    // Création des "li" pour les ingrédients.
    display() {
        const list = document.querySelector(`#${this.type}-dropdown-content`);
        list.innerHTML = "";
        this.filtered.forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = item.charAt(0).toUpperCase() + item.slice(1);
          li.classList.add('item');
          li.addEventListener('click', (e) => {
            const tag = e.target.innerText.toLowerCase();
            if (this.selected.has(tag)) {
              e.target.style.cursor = 'not-allowed';
              e.target.style.opacity = '0.50';
              return;
            }
            this.selected.add(tag)
            this.displaySelection(tag)
            const filteredRecipes = this.list.filterRecipes();
            this.list.display(filteredRecipes)
            this.listerForUnselect(tag)
            this.collect(filteredRecipes);
            this.display(this.filtered)
            this.updateOtherFilters(filteredRecipes);
            this.listenForSelection()
          });
          list.appendChild(li);
        });
      }
      


    // Convertir les li en minuscules pour le stocker dans tag
    listenForSelection() {
        document.querySelectorAll(`#${this.type}-dropdown .item`).forEach(li =>
        {
            li.addEventListener("click", (e) => 
            {
                const tag = e.target.innerText.toLowerCase();
                if (this.selected.has(tag)) {
                    e.target.style.cursor = 'not-allowed';
                    e.target.style.opacity = '0.50';
                    return;
                }

                this.selected.add(tag)
                this.displaySelection(tag)
                // Filtrage des recettes avec le nouveau tag
                const filteredRecipes = this.list.filterRecipes();
                this.list.display(filteredRecipes)
                this.listerForUnselect(tag)
                this.collect(filteredRecipes);
                this.display(this.filtered)
                this.updateOtherFilters(filteredRecipes);
                this.listenForSelection()
            })
        })
    }


    displaySelection(tag) {
        const el = document.createElement("span");
        el.classList.add(`tag-${this.type}`);
        el.dataset.value = tag;
        el.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1) + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(el);
    }

    removeSelection(tag) {
        const tagEl = document.querySelector(`.tag-${this.type}[data-value="${tag}"]`)
        tagEl.remove()
        const filteredRecipes = this.list.filterRecipes();
        this.list.display(filteredRecipes)
        this.collect(filteredRecipes)
        this.display(this.filtered)
        this.updateOtherFilters(filteredRecipes);
        this.listenForSelection()
    }
    

    listerForUnselect (tag) {
        const tagEl = document.querySelector(`.tag-${this.type}[data-value="${tag}"]`)
        tagEl.querySelector('.delete-tag').addEventListener("click", (e) => {
            this.selected.delete(tag);
            this.removeSelection(tag)
            const filteredRecipes = this.list.filterRecipes();
            this.list.display(filteredRecipes)
            this.collect(filteredRecipes)
            this.listenForSelection()
          });
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

    updateOtherFilters(filteredRecipes) {
        const ingredientsFilter = this.list.filters.find(filter => filter.type === 'ingredients');
        const appliancesFilter = this.list.filters.find(filter => filter.type === 'appliances');
        const ustensilsFilter = this.list.filters.find(filter => filter.type === 'ustensils');
    
        ingredientsFilter.collect(filteredRecipes);
        appliancesFilter.collect(filteredRecipes);
        ustensilsFilter.collect(filteredRecipes);
    
        ingredientsFilter.all = ingredientsFilter.filtered;
        appliancesFilter.all = appliancesFilter.filtered;
        ustensilsFilter.all = ustensilsFilter.filtered;
    
        ingredientsFilter.display();
        appliancesFilter.display();
        ustensilsFilter.display();
        
    }




    

}

export default Filter