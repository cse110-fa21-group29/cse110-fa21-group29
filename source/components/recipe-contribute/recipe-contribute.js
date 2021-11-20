import { Database } from "../../core/database/database.js"

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
    const customRecipe = {
      "categories": {
        "vegan": false,
        "vegetarian": false,
        "glutenFree": false
      },
      "description": "",
      "info": {
        "readyInMinutes": 0,
        "pricePerServings": 0,
        "weightWatcherSmartPoints": 0,
        "healthScore": 0
      },
      "ingredients": [],
      "metadata": {
        "id": 0,
        "title": "",
        "author": "",
        "image": ""
      },
    "nutrients": {
        "totalServings": 0,
        "calories": "0",
        "protein": "0g",
        "fat": "0g"
    },
    "spoonacularSourceUrl": "",
    "steps": "<ol>",
    };

    this.shadowRoot.querySelector("#submit-button").addEventListener("click", () => {
      // Nutrients
      customRecipe.nutrients.totalServings = this.shadowRoot.querySelector("#input-number-of-servings").value;
      customRecipe.nutrients.calories = this.shadowRoot.querySelector("#input-colories").value;
      customRecipe.nutrients.protein = this.shadowRoot.querySelector("#input-protein").value;
      customRecipe.nutrients.fat = this.shadowRoot.querySelector("#input-fat").value;

      // Categories
      customRecipe.categories.vegan = this.shadowRoot.querySelector("#input-vegan").checked;
      customRecipe.categories.vegetarian = this.shadowRoot.querySelector("#input-vegetarian").checked;
      customRecipe.categories.glutenFree = this.shadowRoot.querySelector("#input-gluten-free").checked;
      
      // Recipe General Information
      customRecipe.metadata.title = this.shadowRoot.querySelector("#input-recipe-title").value;
      customRecipe.metadata.author = this.shadowRoot.querySelector("#input-author").value;
      customRecipe.metadata.readyInMinutes = this.shadowRoot.querySelector("#input-time").value;
      customRecipe.metadata.pricePerServings = this.shadowRoot.querySelector("#input-cost").value;

      // Description
      customRecipe.description = this.shadowRoot.querySelector("#input-description").value;

      // Ingredients
      const ingredients = this.shadowRoot.querySelector("#input-ingredient").value.split('\n');
      customRecipe.ingredients = ingredients;

      // Directions
      const steps = this.shadowRoot.querySelector('#input-direction').value.split('\n');

      for (let i = 0; i < steps.length; i++) {
        customRecipe.steps = customRecipe.steps + "<li>" + steps[i] + "</li>";
      }

      customRecipe.steps = customRecipe.steps + "</ol>";

      new Database().writeUserData(customRecipe);
    });
    console.log("this.routeName:");
    console.log(this.routeName);
    console.log("this.routeParams:");
    console.log(this.routeParams);
  }

  uploadImg(event) {
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }
}

customElements.define("recipe-contribute", RecipeContribute);
