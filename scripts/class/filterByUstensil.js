import { getdata } from "../api/api.js";
import { displayData } from "../pages/searchpage.js";

class UstensilsFilter {
    constructor() {
        this.allUstensils = new Set();
        this.showDropdown();
        this.hideDropdown();
        this.searchFilter();
    }

    async init() {
        this.recipes = await getdata();
        this.recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.allUstensils.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
        ));
        this.displayUstensils();
    }

    displayUstensils() {
        const ustensilsList = document.querySelector("#ustensils-dropdown-content");
        ustensilsList.innerHTML = "";
        this.allUstensils.forEach(ustensil => {
            const li = document.createElement("li");
            li.innerHTML = ustensil;
            li.addEventListener("click", () => this.filterByUstensil(ustensil));
            ustensilsList.appendChild(li);
        });
    }

    filterByUstensil(ustensil) {
        let searchResults = this.filterRecipes(this.recipes, [ustensil]);
        this.filterUstensilsByResults(searchResults);
        this.addTag(ustensil);
        displayData(searchResults);
    }

    filterRecipes(recipes, selectedUstensils) {
        return recipes.filter(recipe => {
            return recipe.ustensils.some(ustensil => {
                return selectedUstensils.map(s => s.toLowerCase()).includes(ustensil.toLowerCase());
            });
        });
    }

    filterUstensilsByResults(data) {
        let searchResults = data;
        let filteredUstensils = new Set();
        searchResults.forEach(recipe => recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil)));
        this.allUstensils = filteredUstensils;
        this.displayUstensils();
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
            let filteredUstensils = Array.from(this.allUstensils).filter(ustensil => ustensil.toLowerCase().includes(searchTerm));
            const ustensilsList = document.querySelector("#ustensils-dropdown-content");
            ustensilsList.innerHTML = "";
            filteredUstensils.forEach(ustensil => {
                const li = document.createElement("li");
                li.innerHTML = ustensil;
                li.addEventListener("click", () => {
                    this.filterByUstensil(ustensil);
                    this.addTag(ustensil);
                });
                ustensilsList.appendChild(li);
            });
        });
    }
    

    addTag(ustensil) {
        const tag = document.createElement("span");
        tag.classList.add("tag-ustensil");
        tag.innerHTML = ustensil + '<span class="delete-tag">x</span>';
        document.querySelector(".tags").appendChild(tag);
        tag.querySelector(".delete-tag").addEventListener("click", () => {
            tag.remove();
            this.resetResults();
        });
    }

    

    resetResults() {
        this.filterUstensilsByResults(this.recipes)
        this.displayUstensils()
        displayData(this.recipes);
    }

}

export default UstensilsFilter