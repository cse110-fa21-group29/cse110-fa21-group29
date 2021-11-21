//import "@fortawesome/fontawesome-free/js/all.js";
import { Database } from "../../core/database/database.js";

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

  async connectedCallback() {
    let elementContent = await fetch("components/home-page/home-page.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

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

    const database = new Database();
    const data = await database.getRecipes();

    data.sort(function (a, b) {
      let aProtein = parseInt(
        a.nutrients.protein.substring(0, a.nutrients.protein.length - 1)
      );
      let bProtein = parseInt(
        b.nutrients.protein.substring(0, b.nutrients.protein.length - 1)
      );
      if (aProtein < bProtein) {
        return 1;
      } else if (aProtein > bProtein) {
        return -1;
      } else {
        return 0;
      }
    });

    const lowCalorieRecipe = [];
    const veganRecipe = [];
    const vegetarianRecipe = [];

    for (let i = 0; i < data.length; i++) {
      if (parseInt(data[i].nutrients.calories) < 450)
        lowCalorieRecipe.push(data[i]);
      if (data[i].categories.vegan) veganRecipe.push(data[i]);
      if (data[i].categories.vegetarian) vegetarianRecipe.push(data[i]);
    }

    let proteinRecipeArr = [];
    let lowCalorieRecipeArr = [];
    let veganRecipeArr = [];
    let vegetarianRecipeArr = [];

    for (let i = 0; i < 20; i++) {
      proteinRecipeArr[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      proteinRecipeArr[i].querySelector(".recipe-card-name > div").innerHTML =
        data[i].metadata.title;
      proteinRecipeArr[i].querySelector(".recipe-card-image").src =
        data[i].metadata.image;
      proteinRecipeArr[i].querySelector("#time").innerHTML =
        data[i].info.readyInMinutes;
      proteinRecipeArr[i].querySelector("#calories").innerHTML = parseInt(
        data[i].nutrients.calories
      );
      proteinRecipeArr[i].querySelector("#protein").innerHTML =
        data[i].nutrients.protein;
      proteinRecipeArr[i].querySelector("#score").innerHTML =
        data[i].info.healthScore;
      proteinRecipeArr[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [data[i].metadata.id],
          },
          bubbles: true,
          composed: true,
        });
        proteinRecipeArr[i].dispatchEvent(routerEvent);
      });

      lowCalorieRecipeArr[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      lowCalorieRecipeArr[i].querySelector(
        ".recipe-card-name > div"
      ).innerHTML = lowCalorieRecipe[i].metadata.title;
      lowCalorieRecipeArr[i].querySelector(".recipe-card-image").src =
        lowCalorieRecipe[i].metadata.image;
      lowCalorieRecipeArr[i].querySelector("#time").innerHTML =
        lowCalorieRecipe[i].info.readyInMinutes;
      lowCalorieRecipeArr[i].querySelector("#calories").innerHTML = parseInt(
        lowCalorieRecipe[i].nutrients.calories
      );
      lowCalorieRecipeArr[i].querySelector("#protein").innerHTML =
        lowCalorieRecipe[i].nutrients.protein;
      lowCalorieRecipeArr[i].querySelector("#score").innerHTML =
        lowCalorieRecipe[i].info.healthScore;
      lowCalorieRecipeArr[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [lowCalorieRecipe[i].metadata.id],
          },
          bubbles: true,
          composed: true,
        });
        lowCalorieRecipeArr[i].dispatchEvent(routerEvent);
      });

      veganRecipeArr[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      veganRecipeArr[i].querySelector(".recipe-card-name > div").innerHTML =
        veganRecipe[i].metadata.title;
      veganRecipeArr[i].querySelector(".recipe-card-image").src =
        veganRecipe[i].metadata.image;
      veganRecipeArr[i].querySelector("#time").innerHTML =
        veganRecipe[i].info.readyInMinutes;
      veganRecipeArr[i].querySelector("#calories").innerHTML = parseInt(
        veganRecipe[i].nutrients.calories
      );
      veganRecipeArr[i].querySelector("#protein").innerHTML =
        veganRecipe[i].nutrients.protein;
      veganRecipeArr[i].querySelector("#score").innerHTML =
        veganRecipe[i].info.healthScore;
      veganRecipeArr[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [veganRecipe[i].metadata.id],
          },
          bubbles: true,
          composed: true,
        });
        veganRecipeArr[i].dispatchEvent(routerEvent);
      });

      vegetarianRecipeArr[i] = this.shadowRoot
        .getElementById("recipe-card-sample")
        .cloneNode(true);
      vegetarianRecipeArr[i].querySelector(
        ".recipe-card-name > div"
      ).innerHTML = vegetarianRecipe[i].metadata.title;
      vegetarianRecipeArr[i].querySelector(".recipe-card-image").src =
        vegetarianRecipe[i].metadata.image;
      vegetarianRecipeArr[i].querySelector("#time").innerHTML =
        vegetarianRecipe[i].info.readyInMinutes;
      vegetarianRecipeArr[i].querySelector("#calories").innerHTML = parseInt(
        vegetarianRecipe[i].nutrients.calories
      );
      vegetarianRecipeArr[i].querySelector("#protein").innerHTML =
        vegetarianRecipe[i].nutrients.protein;
      vegetarianRecipeArr[i].querySelector("#score").innerHTML =
        vegetarianRecipe[i].info.healthScore;
      vegetarianRecipeArr[i].addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [vegetarianRecipe[i].metadata.id],
          },
          bubbles: true,
          composed: true,
        });
        vegetarianRecipeArr[i].dispatchEvent(routerEvent);
      });
    }

    this.shadowRoot.getElementById("recipe-card-grid-1").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-2").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-3").innerHTML = "";
    this.shadowRoot.getElementById("recipe-card-grid-4").innerHTML = "";

    for (let i = 0; i < 20; i++) {
      this.shadowRoot
        .getElementById("recipe-card-grid-1")
        .append(proteinRecipeArr[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-2")
        .append(lowCalorieRecipeArr[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-3")
        .append(veganRecipeArr[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-4")
        .append(vegetarianRecipeArr[i]);
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
