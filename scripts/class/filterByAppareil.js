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

}

export default AppareilsFilter