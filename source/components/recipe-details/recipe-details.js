import { Database } from "../../core/database/database.js";

/** Class that provides functionality to the recipe details page. */
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

  /**
   * Fires when this component is inserted into the DOM.
   *
   * @async
   */
  async connectedCallback() {
    const elementContent = await fetch(
      "components/recipe-details/recipe-details.html"
    );
    const elementContentText = await elementContent.text();

    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }
  count = 0;
  temp;
  timeron = 0;
  /**
   * Populates recipe details page with information from the database and adds
   * delete functionality.
   *
   * @async
   */
  async setupElement() {
    this.shadowRoot
      .getElementById("timer-button")
      .addEventListener("click", () => {
        if (this.shadowRoot.getElementById("timer").style.display == "") {
          this.shadowRoot.getElementById("timer").style.display = "flex";
        } else {
          this.shadowRoot.getElementById("timer").style.display = "";
        }
      });
    this.shadowRoot
      .getElementById("start-button")
      .addEventListener("click", () => {
        if (!this.timeron) {
          this.timeron = 1;
          this.timedCount();
          this.shadowRoot.getElementById("start-button").innerHTML = "Stop";
        } else {
          this.shadowRoot.getElementById("start-button").innerHTML = "Start";
          clearTimeout(this.temp);
          this.timeron = 0;
        }
      });
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        clearTimeout(this.temp);
        this.timeron = 0;
        this.count = 0;
        this.setTime();
      });

    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // If recipe does not exist, then skip page setup.
    if (recipe == null) {
      return;
    }

    // Recipe edit button
    this.shadowRoot
      .querySelector("#edit-button")
      .addEventListener("click", () => {
        // Route to edit page
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-contribute-edit",
            params: [this.routeParams[0]],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);
      });

    // Recipe delete button
    this.shadowRoot
      .querySelector("#delete-button")
      .addEventListener("click", () => {
        // Delete recipe from button
        database.deleteRecipe(this.routeParams[0]);

        // Route to home-page
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "home-page",
            params: [],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);

        // Notify user that recipe was deleted
        alert("Recipe deleted");
      });

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
  /**
   * help function for timer
   */
  timedCount() {
    this.setTime();
    this.count = this.count + 1;
    this.temp = setTimeout(this.timedCount.bind(this), 1000);
  }

  /**
   * set timer
   */
  setTime() {
    let hour = parseInt(this.count / 3600);
    let minute = parseInt(this.count / 60);
    let second = parseInt(this.count % 60);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    this.shadowRoot.getElementById("timer-display").innerText =
      hour + ":" + minute + ":" + second;
  }
}

customElements.define("recipe-details", RecipeDetails);
