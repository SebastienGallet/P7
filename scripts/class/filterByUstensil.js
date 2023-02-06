class UstensilsFilter {
    constructor(recipes) {
        this.recipes = recipes
        this.all = new Set();
        this.selected = new Set();
        this.showDropdown();
        this.hideDropdown();
        this.searchFilter();
    }

    collect(recipes)
    {
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                this.all.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1)) 
            })
        })
        return this.all
    }

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

    listenForSelection() {
        document.querySelectorAll('.item').forEach(li =>
        {
            li.addEventListener("click", (e) => 
            {
                const tag = e.target.innerText.toLowerCase();
                this.addToSelection(tag)
                this.filter()
            })
        })
    }

    addToSelection(tag) {
        this.selected.add(tag)
        const el = document.createElement("span");
        el.classList.add("tag-ustensil");
        el.innerHTML = tag + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(el);
        el.querySelector(".delete-tag").addEventListener("click", () => {
            this.selected.delete(tag);
            el.remove();
        });
    }

    filter() {
        const list = []

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

    filterRecipes(recipes, selected) {
        return recipes.filter(recipe => {
            return selected.every(ustensil => {
                return recipe.ustensils.map(u => u.toLowerCase()).includes(ustensil.toLowerCase());
            });
        });
    }

    filterByResults(data) {
        let searchResults = data;
        // set() pour eviter les doublons
        let filteredUstensils = new Set();
        searchResults.forEach(recipe => recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil)));
        this.all = filteredUstensils;
        this.display();
    }

    showDropdown() {
        document.querySelector("#ustensils-filter-button").addEventListener("click", () => {
            document.querySelector("#ustensils-dropdown").style.display = 'block';
            document.querySelector("#ustensils-filter-button").style.display = 'none';
        });
    }

    hideDropdown() {
        document.querySelector("#arrow-ustensils").addEventListener("click", () => {
            document.querySelector("#ustensils-filter-button").style.display = 'block';
            document.querySelector("#ustensils-dropdown").style.display = 'none';
        });
    }

    searchFilter() {
        const searchBar = document.querySelector("#searchbar-ustensils");
        searchBar.addEventListener("input", () => {
            let searchTerm = searchBar.value.toLowerCase();
            let filteredUstensils = Array.from(this.all).filter(ustensil => ustensil.toLowerCase().includes(searchTerm));
            const ustensilsList = document.querySelector("#ustensils-dropdown-content");
            ustensilsList.innerHTML = "";
            filteredUstensils.forEach(ustensil => {
                const li = document.createElement("li");
                li.innerHTML = ustensil;
                li.addEventListener("click", () => {
                    this.filter(ustensil);
                    this.addTag(ustensil);
                });
                ustensilsList.appendChild(li);
            });
        });
    }
    

}

export default UstensilsFilter