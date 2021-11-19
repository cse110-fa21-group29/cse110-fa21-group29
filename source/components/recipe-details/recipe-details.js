import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

let response = await fetch('../../config.json');
response = await response.json();

const app = initializeApp(response.firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());
let data = undefined;

await get(child(dbRef, `recipes`)).then((snapshot) => {
  if (snapshot.exists()) {
    data = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

class RecipeDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set params(params) {
    this.routeParams = params;
  }
  set route(route) {
    this.routeName = route;
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/recipe-details/recipe-details.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    const url = window.location.href.split("/");
    const url_id = url[url.length - 1];
    let recipe = undefined;

    for (let i = 0; i < data.length; i++) {
      if (data[i].metadata.id == url_id) {
        recipe = data[i];
        break;
      }
    }

    // This is the first row of the page, including the image and the author box
    this.shadowRoot.querySelector(".recipe-image").src = recipe.metadata.image;
    this.shadowRoot.querySelector(".dish-name").innerHTML = recipe.metadata.title;
    this.shadowRoot.querySelector(".author-name").innerHTML = recipe.metadata.author;
    this.shadowRoot.querySelector(".recipe-url").innerHTML = recipe.spoonacularSourceUrl;

    // Description box
    this.shadowRoot.querySelector(".description").innerHTML = recipe.description;

    // Information box
    this.shadowRoot.querySelector("#cost").innerHTML = recipe.info.pricePerServings;
    this.shadowRoot.querySelector("#time").innerHTML = recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#servings").innerHTML = recipe.nutrients.totalServings;

    // Category box
    if (recipe.categories.vegan == false) this.shadowRoot.querySelector("#vegan").style.display = "none";
    if (recipe.categories.vegetarian == false) this.shadowRoot.querySelector("#vegetarian").style.display = "none";
    if (recipe.nutrients.calories > 450) this.shadowRoot.querySelector("#low-calorie").style.display = "none";
    if (recipe.categories.glutenFree == false) this.shadowRoot.querySelector("#gluten-free").style.display = "none";

    // Nutrient box
    this.shadowRoot.querySelector("#calories").innerHTML = recipe.nutrients.calories;
    this.shadowRoot.querySelector("#fat").innerHTML = recipe.nutrients.fat;
    this.shadowRoot.querySelector("#protein").innerHTML = recipe.nutrients.protein;

    // Ingredients box
    let ingredients = "";

    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredients = ingredients + "<li>" + recipe.ingredients[i] + "</li>";
    }

    this.shadowRoot.querySelector(".ingredients-list").innerHTML = "<ul>" + ingredients + "</ul>";

    // Direction box
    this.shadowRoot.querySelector(".direction-list").innerHTML = recipe.steps;
  }
}

customElements.define("recipe-details", RecipeDetails);
