import { Database } from "../../core/database/database.js";

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

  async setupElement() {
    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // This is the first row of the page, including the image and the author box
    this.shadowRoot.querySelector(".recipe-image").src = recipe.metadata.image;
    this.shadowRoot.querySelector(".dish-name").innerHTML =
      recipe.metadata.title;
    this.shadowRoot.querySelector(".author-name").innerHTML =
      recipe.metadata.author;
    this.shadowRoot.querySelector(".recipe-url").innerHTML =
      recipe.spoonacularSourceUrl;

    // Description box
    this.shadowRoot.querySelector(".description").innerHTML =
      recipe.description;

    // Information box
    this.shadowRoot.querySelector("#cost").innerHTML =
      recipe.info.pricePerServings;
    this.shadowRoot.querySelector("#time").innerHTML =
      recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#servings").innerHTML =
      recipe.nutrients.totalServings;

    // Category box
    if (recipe.categories.vegan == false) {
      this.shadowRoot.querySelector("#vegan").style.display = "none";
    }
    if (recipe.categories.vegetarian == false) {
      this.shadowRoot.querySelector("#vegetarian").style.display = "none";
    }
    if (recipe.categories.glutenFree == false) {
      this.shadowRoot.querySelector("#gluten-free").style.display = "none";
    }
    if (recipe.categories.highProtein == false) {
      this.shadowRoot.querySelector("#high-protein").style.display = "none";
    }
    if (recipe.categories.healthy == false) {
      this.shadowRoot.querySelector("#healthy").style.display = "none";
    }

    // Nutrient box
    this.shadowRoot.querySelector("#calories").innerHTML =
      recipe.nutrients.calories;
    this.shadowRoot.querySelector("#fat").innerHTML = recipe.nutrients.fat;
    this.shadowRoot.querySelector("#protein").innerHTML =
      recipe.nutrients.protein;

    // Ingredients box
    let ingredients = "";

    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredients = ingredients + "<li>" + recipe.ingredients[i] + "</li>";
    }

    this.shadowRoot.querySelector(".ingredients-list").innerHTML =
      "<ul>" + ingredients + "</ul>";

    // Direction box
    this.shadowRoot.querySelector(".direction-list").innerHTML = recipe.steps;
  }
}

customElements.define("recipe-details", RecipeDetails);
