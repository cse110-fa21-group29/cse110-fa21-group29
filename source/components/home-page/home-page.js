//import "@fortawesome/fontawesome-free/js/all.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

let response = await fetch('/config.json');
response = await response.json();

const app = initializeApp(response.firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());
let data = [];
await get(child(dbRef, `recipes`)).then((snapshot) => {
  if (snapshot.exists()) {
    data = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

let chickenRecipe = [];
let veganRecipe = [];
let lowCalorieRecipe = [];
for (let i = 0; i < data.length; i++) {
  let title = data[i].metadata.title.toLowerCase();
  if (data[i].categories.vegan) {
    veganRecipe.push(data[i])
  }
  if (title.search('chicken') != -1) {
    chickenRecipe.push(data[i]);
  }
  if (parseInt(data[i].nutrients.calories) < 450) {
    lowCalorieRecipe.push(data[i]);
  }
}

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch("components/home-page/home-page.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    for (let i = 1; i < 5; i++) {
      let recippecardgrid = this.shadowRoot.getElementById(
        "recipe-card-grid-" + i
      );
      this.shadowRoot
        .getElementById("prev-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(true, recippecardgrid);
        });
      this.shadowRoot
        .getElementById("next-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(false, recippecardgrid);
        });
    }

    // copy recipe
    let chickenRecipeArr = [];
    let veganRecipeArr = [];
    let lowCalorieRecipeArr = [];

    for (let i = 0; i < 20; i++) {
      chickenRecipeArr[i] = this.shadowRoot.getElementById("recipe-card-sample").cloneNode(true);
      chickenRecipeArr[i].querySelector('.recipe-card-name > div').innerHTML = chickenRecipe[i].metadata.title;
      chickenRecipeArr[i].querySelector('.recipe-card-image').src = chickenRecipe[i].metadata.image;
      chickenRecipeArr[i].querySelector('#time').innerHTML = chickenRecipe[i].info.readyInMinutes;
      chickenRecipeArr[i].querySelector('#calories').innerHTML = chickenRecipe[i].nutrients.calories;
      chickenRecipeArr[i].querySelector('#protein').innerHTML = chickenRecipe[i].nutrients.protein;
      chickenRecipeArr[i].querySelector('#score').innerHTML = chickenRecipe[i].info.healthScore;
      
      veganRecipeArr[i] = this.shadowRoot.getElementById("recipe-card-sample").cloneNode(true);
      veganRecipeArr[i].querySelector('.recipe-card-name > div').innerHTML = veganRecipe[i].metadata.title;
      veganRecipeArr[i].querySelector('.recipe-card-image').src = veganRecipe[i].metadata.image;
      veganRecipeArr[i].querySelector('#time').innerHTML = veganRecipe[i].info.readyInMinutes;
      veganRecipeArr[i].querySelector('#calories').innerHTML = veganRecipe[i].nutrients.calories;
      veganRecipeArr[i].querySelector('#protein').innerHTML = veganRecipe[i].nutrients.protein;
      veganRecipeArr[i].querySelector('#score').innerHTML = veganRecipe[i].info.healthScore;

      lowCalorieRecipeArr[i] = this.shadowRoot.getElementById("recipe-card-sample").cloneNode(true);
      lowCalorieRecipeArr[i].querySelector('.recipe-card-name > div').innerHTML = lowCalorieRecipe[i].metadata.title;
      lowCalorieRecipeArr[i].querySelector('.recipe-card-image').src = lowCalorieRecipe[i].metadata.image;
      lowCalorieRecipeArr[i].querySelector('#time').innerHTML = lowCalorieRecipe[i].info.readyInMinutes;
      lowCalorieRecipeArr[i].querySelector('#calories').innerHTML = lowCalorieRecipe[i].nutrients.calories;
      lowCalorieRecipeArr[i].querySelector('#protein').innerHTML = lowCalorieRecipe[i].nutrients.protein;
      lowCalorieRecipeArr[i].querySelector('#score').innerHTML = lowCalorieRecipe[i].info.healthScore;
    }

    this.shadowRoot.getElementById("recipe-card-grid-1").innerHTML = '';
    this.shadowRoot.getElementById("recipe-card-grid-2").innerHTML = '';
    this.shadowRoot.getElementById("recipe-card-grid-3").innerHTML = '';

    for (let i = 0; i < 20; i++) {
      this.shadowRoot
        .getElementById("recipe-card-grid-1")
        .append(chickenRecipeArr[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-2")
        .append(veganRecipeArr[i]);
      this.shadowRoot
        .getElementById("recipe-card-grid-3")
        .append(lowCalorieRecipeArr[i]);
        .append(recipesample.cloneNode(true));
      this.shadowRoot
        .getElementById("recipe-card-grid-4")
        .append(recipesample.cloneNode(true));
    }

    this.shadowRoot.querySelectorAll(".recipe-card").forEach((recipeCard) => {
      recipeCard.addEventListener("click", () => {
        // TODO: Add info about specific recipe card
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [1],
          },
          bubbles: true,
          composed: true,
        });
        recipeCard.dispatchEvent(routerEvent);
      });
    });
  }

  recipeScroll(scrollleft, recipegrid) {
    if (scrollleft) {
      recipegrid.scroll({
        left: recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4,
        behavior: "smooth",
      });
    } else {
      recipegrid.scroll({
        left: recipegrid.scrollLeft + (recipegrid.clientWidth * 3) / 4,
        behavior: "smooth",
      });
    }
  }
}

customElements.define("home-page", HomePage);
