import { Database } from "../../core/database/database.js";

/** Class that provides functionality to the homepage. */
class HomePage extends HTMLElement {
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
    const elementContent = await fetch("components/home-page/home-page.html");
    const elementContentText = await elementContent.text();

    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  /**
   * Populates homepage recipe card with information from the database.
   *
   * @async
   */
  async setupElement() {
    for (let i = 1; i < 5; i++) {
      this.shadowRoot
        .getElementById("prev-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(true, i);
        });
      this.shadowRoot.getElementById("prev-button-" + i).style.visibility =
        "hidden";

      this.shadowRoot
        .getElementById("next-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(false, i);
        });
    }

    // Get recipes from database
    const database = new Database();
    const recipes = await database.getRecipes();

    // Arrays to store recipe subsets and their index in database
    const highProtein = [];
    const highProteinIndex = [];
    const healthy = [];
    const healthyIndex = [];
    const vegan = [];
    const veganIndex = [];
    const vegetarian = [];
    const vegetarianIndex = [];

    // Loop through recipe data and push to subset arrays
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i] == null) {
        continue;
      }
      if (recipes[i].categories.highProtein) {
        highProtein.push(recipes[i]);
        highProteinIndex.push(i);
      }
      if (recipes[i].categories.healthy) {
        healthy.push(recipes[i]);
        healthyIndex.push(i);
      }
      if (recipes[i].categories.vegan) {
        vegan.push(recipes[i]);
        veganIndex.push(i);
      }
      if (recipes[i].categories.vegetarian) {
        vegetarian.push(recipes[i]);
        vegetarianIndex.push(i);
      }
    }

    // Arrays to hold generate recipe cards
    const highProteinCards = [];
    const healthyCards = [];
    const veganCards = [];
    const vegetarianCards = [];

    // Create 20 recipe cards that are populated with data from recipe subset arrays
    for (let i = 0; i < 20; i++) {
      // High protein recipe card
      highProteinCards[i] = document.createElement("common-recipe-card");
      highProteinCards[i].recipeData = highProtein[i];

      highProteinCards[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [highProteinIndex[i]],
          },
          bubbles: true,
          composed: true,
        });
        highProteinCards[i].dispatchEvent(routerEvent);
      });

      // Healthy recipe card
      healthyCards[i] = document.createElement("common-recipe-card");
      healthyCards[i].recipeData = healthy[i];

      healthyCards[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [healthyIndex[i]],
          },
          bubbles: true,
          composed: true,
        });
        healthyCards[i].dispatchEvent(routerEvent);
      });

      // Vegan recipe card
      veganCards[i] = document.createElement("common-recipe-card");
      veganCards[i].recipeData = vegan[i];

      veganCards[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [veganIndex[i]],
          },
          bubbles: true,
          composed: true,
        });
        veganCards[i].dispatchEvent(routerEvent);
      });

      // Vegetarian recipe card
      vegetarianCards[i] = document.createElement("common-recipe-card");
      vegetarianCards[i].recipeData = vegetarian[i];

      vegetarianCards[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [vegetarianIndex[i]],
          },
          bubbles: true,
          composed: true,
        });
        vegetarianCards[i].dispatchEvent(routerEvent);
      });
    }

    // Clear out recipe card grids before we append new cards
    this.shadowRoot.getElementById("recipe-card-grid-1").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-2").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-3").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-4").innerHTML = "";

    // Append new cards
    for (let i = 0; i < 20; i++) {
      this.shadowRoot
        .getElementById("recipe-card-grid-1")
        .append(highProteinCards[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-2")
        .append(healthyCards[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-3")
        .append(veganCards[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-4")
        .append(vegetarianCards[i]);
    }
  }

  recipeScroll(scrollleft, i) {
    let recipegrid = this.shadowRoot.getElementById("recipe-card-grid-" + i);
    let prevbutton = this.shadowRoot.getElementById("prev-button-" + i);
    let nextbutton = this.shadowRoot.getElementById("next-button-" + i);
    if (scrollleft) {
      recipegrid.scrollLeft -= (recipegrid.clientWidth * 3) / 4;
      nextbutton.style.visibility = "visible";
      if (recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4 < 5) {
        prevbutton.style.visibility = "hidden";
      }
    } else {
      recipegrid.scrollLeft += (recipegrid.clientWidth * 3) / 4;
      prevbutton.style.visibility = "visible";
      if (
        recipegrid.scrollLeft + (recipegrid.clientWidth * 3) / 4 >
        recipegrid.scrollWidth - recipegrid.clientWidth
      ) {
        nextbutton.style.visibility = "hidden";
      }
    }
  }
}

customElements.define("home-page", HomePage);
