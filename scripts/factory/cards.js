export default function cardsFactory (data) {
    const  {id, name, servings, ingredients, time, description, appliance, ustensils} = data

    function getCardDOM () {
        let ingredientsList = ""
        for(const ingredient of ingredients) {
            ingredientsList += `<p class="ingredient" ><strong>${ingredient.ingredient} </strong>${ingredient.quantity ? ":" : ""} ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</p>`
        }
        return `            
            <img src="./../assets/img.webp" alt="image du plat">
            <div class="description">
                <h2>${name}</h2>
                <div class="duration">
                    <img src="./assets/clock.svg" alt="Horloge">
                    <p class="minutes">${time} min</p>
                </div>
                <div class="ingredients">
                    ${ingredientsList}
                </div>
                <p class="consignes">${description}</p>
            </div>
        `
    }

    return {getCardDOM}
}
