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
      highProteinCards[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      highProteinCards[i].querySelector(".recipe-card-name > div").innerHTML =
        highProtein[i].metadata.title;
      highProteinCards[i].querySelector(".recipe-card-image").src =
        highProtein[i].metadata.image;
      highProteinCards[i].querySelector("#time").innerHTML =
        highProtein[i].info.readyInMinutes;
      highProteinCards[i].querySelector("#calories").innerHTML = parseInt(
        highProtein[i].nutrients.calories
      );
      highProteinCards[i].querySelector("#protein").innerHTML =
        highProtein[i].nutrients.protein;
      highProteinCards[i].querySelector("#score").innerHTML =
        highProtein[i].info.healthScore;
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
      healthyCards[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      healthyCards[i].querySelector(".recipe-card-name > div").innerHTML =
        healthy[i].metadata.title;
      healthyCards[i].querySelector(".recipe-card-image").src =
        healthy[i].metadata.image;
      healthyCards[i].querySelector("#time").innerHTML =
        healthy[i].info.readyInMinutes;
      healthyCards[i].querySelector("#calories").innerHTML = parseInt(
        healthy[i].nutrients.calories
      );
      healthyCards[i].querySelector("#protein").innerHTML =
        healthy[i].nutrients.protein;
      healthyCards[i].querySelector("#score").innerHTML =
        healthy[i].info.healthScore;
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
      veganCards[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      veganCards[i].querySelector(".recipe-card-name > div").innerHTML =
        vegan[i].metadata.title;
      veganCards[i].querySelector(".recipe-card-image").src =
        vegan[i].metadata.image;
      veganCards[i].querySelector("#time").innerHTML =
        vegan[i].info.readyInMinutes;
      veganCards[i].querySelector("#calories").innerHTML = parseInt(
        vegan[i].nutrients.calories
      );
      veganCards[i].querySelector("#protein").innerHTML =
        vegan[i].nutrients.protein;
      veganCards[i].querySelector("#score").innerHTML =
        vegan[i].info.healthScore;
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
      vegetarianCards[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      vegetarianCards[i].querySelector(".recipe-card-name > div").innerHTML =
        vegetarian[i].metadata.title;
      vegetarianCards[i].querySelector(".recipe-card-image").src =
        vegetarian[i].metadata.image;
      vegetarianCards[i].querySelector("#time").innerHTML =
        vegetarian[i].info.readyInMinutes;
      vegetarianCards[i].querySelector("#calories").innerHTML = parseInt(
        vegetarian[i].nutrients.calories
      );
      vegetarianCards[i].querySelector("#protein").innerHTML =
        vegetarian[i].nutrients.protein;
      vegetarianCards[i].querySelector("#score").innerHTML =
        vegetarian[i].info.healthScore;
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
