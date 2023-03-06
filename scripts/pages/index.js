import { getdata } from "../api/api.js";
import filterByIngredient from "../class/filterByIngredient.js";
import filterByUstensil from "../class/filterByUstensil.js";
import filterByAppareil from "../class/filterByAppareil.js";
import List from "../class/list.js";

const recipesData = await getdata();
const list = new List(recipesData)
list.display(list.all)

const filterAppareil = new filterByAppareil(list);
list.addFilter(filterAppareil)

const filterIngredient = new filterByIngredient(list);
filterIngredient.listenForInputFilter()
list.addFilter(filterIngredient)

const filterUstensil = new filterByUstensil(list);
filterUstensil.listenForInputFilter();
list.addFilter(filterUstensil)

list.listen()

