import { Database } from "../../core/database/database.js";

class RecipeContribute extends HTMLElement {
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
      "components/recipe-contribute/recipe-contribute.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  async setupElement() {
    // Set up page for adding recipe or editing recipe
    if (this.routeName === "recipe-contribute-add") {
      this.addRecipe();
    } else {
      this.editRecipe();
    }

    // console.log("this.routeName:");
    // console.log(this.routeName);
    // console.log("this.routeParams:");
    // console.log(this.routeParams);
  }

  uploadImg(event) {
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }

  /**
   * Sets up the page for adding a new recipe
   */
  async addRecipe() {
    // Empty object that will get populated using form values
    const recipe = {
      metadata: {
        id: -1,
        title: "",
        author: "",
        image: "static/common/demorecipe.jpg",
      },
      info: {
        readyInMinutes: 0,
        pricePerServings: 0,
        weightWatcherSmartPoints: 0,
        healthScore: 100,
      },
      categories: {
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        highProtein: false,
        healthy: false,
      },
      nutrients: {
        totalServings: 0,
        calories: 0,
        protein: "0g",
        fat: "0g",
      },
      description: "",
      ingredients: [],
      steps: "<ol>",
      spoonacularSourceUrl: "",
    };

    // Assign saveRecipe function to submit button
    this.shadowRoot
      .querySelector("#submit-button")
      .addEventListener("click", (e) => {
        this.saveRecipe(recipe, true);
        e.preventDefault();
      });
  }

  /**
   * Sets up the page for editing an existing recipe
   */
  async editRecipe() {
    // Get recipes from database
    const db = new Database();
    const data = await db.getRecipes();

    // Get specific recipe
    let recipe = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].metadata.id == this.routeParams[0]) {
        recipe = data[i];
        break;
      }
    }

    // Display current recipe image
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + recipe.metadata.image + ")";

    // Pre-populate form with nutrients
    this.shadowRoot.querySelector("#input-number-of-servings").value =
      recipe.nutrients.totalServings;
    this.shadowRoot.querySelector("#input-colories").value =
      recipe.nutrients.calories;
    this.shadowRoot.querySelector("#input-protein").value =
      recipe.nutrients.protein;
    this.shadowRoot.querySelector("#input-fat").value = recipe.nutrients.fat;

    // Pre-populate form with categories
    this.shadowRoot.querySelector("#input-vegan").checked =
      recipe.categories.vegan;
    this.shadowRoot.querySelector("#input-vegetarian").checked =
      recipe.categories.vegetarian;
    this.shadowRoot.querySelector("#input-gluten-free").checked =
      recipe.categories.glutenFree;

    // Pre-populate form with general information
    this.shadowRoot.querySelector("#input-recipe-title").value =
      recipe.metadata.title;
    this.shadowRoot.querySelector("#input-author").value =
      recipe.metadata.author;
    this.shadowRoot.querySelector("#input-time").value =
      recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#input-cost").value =
      recipe.info.pricePerServings;

    // Pre-populate form with description
    this.shadowRoot.querySelector("#input-description").innerText =
      recipe.description;

    // Pre-populate form with ingredients
    const ingredients = recipe.ingredients.join("\n");
    this.shadowRoot.querySelector("#input-ingredient").innerHTML = ingredients;

    // Pre-populate form with directions
    const stepsArr = recipe.steps.split("</li>");

    for (let i = 0; i < stepsArr.length; i++) {
      stepsArr[i] = stepsArr[i].replace(/(<([^>]+)>)/gi, "");
    }

    const steps = stepsArr.join("\n");

    this.shadowRoot.querySelector("#input-direction").innerHTML = steps;

    // Update edited recipe in database on submit button click
    this.shadowRoot
      .querySelector("#submit-button")
      .addEventListener("click", (e) => {
        this.saveRecipe(recipe, false);
        e.preventDefault();
      });
  }

  /**
   * Grabs form values, updates recipe object, then pushes object to database.
   * The add parameter should be true if you are adding a new recipe or false
   * if you are updating an existing recipe.
   *
   * @param recipe an object that contains the recipe data
   * @param add    a boolean that toggles adding a new recipe
   */
  async saveRecipe(recipe, add) {
    // Nutrients
    recipe.nutrients.totalServings = this.shadowRoot.querySelector(
      "#input-number-of-servings"
    ).value;
    recipe.nutrients.calories =
      this.shadowRoot.querySelector("#input-colories").value;
    recipe.nutrients.protein =
      this.shadowRoot.querySelector("#input-protein").value;
    recipe.nutrients.fat = this.shadowRoot.querySelector("#input-fat").value;

    // Categories
    recipe.categories.vegan =
      this.shadowRoot.querySelector("#input-vegan").checked;
    recipe.categories.vegetarian =
      this.shadowRoot.querySelector("#input-vegetarian").checked;
    recipe.categories.glutenFree =
      this.shadowRoot.querySelector("#input-gluten-free").checked;

    // Recipe General Information
    recipe.metadata.title = this.shadowRoot.querySelector(
      "#input-recipe-title"
    ).value;
    recipe.metadata.author =
      this.shadowRoot.querySelector("#input-author").value;
    recipe.info.readyInMinutes =
      this.shadowRoot.querySelector("#input-time").value;
    recipe.info.pricePerServings =
      this.shadowRoot.querySelector("#input-cost").value;

    // Description
    recipe.description =
      this.shadowRoot.querySelector("#input-description").value;

    // Ingredients
    const ingredients = this.shadowRoot
      .querySelector("#input-ingredient")
      .value.split("\n");
    recipe.ingredients = ingredients;

    // Directions
    const steps = this.shadowRoot
      .querySelector("#input-direction")
      .value.split("\n");

    recipe.steps = "";

    for (let i = 0; i < steps.length; i++) {
      recipe.steps = recipe.steps + "<li>" + steps[i] + "</li>";
    }

    recipe.steps = recipe.steps + "</ol>";

    // Call database functions based on if add or edit function is specified
    const db = new Database();

    if (add == true) {
      db.pushRecipe(recipe);
    } else {
      db.updateRecipe(recipe, recipe.metadata.id);
    }
  }
}

customElements.define("recipe-contribute", RecipeContribute);
